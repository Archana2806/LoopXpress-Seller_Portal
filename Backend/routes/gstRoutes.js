import express from "express";
import axios from "axios";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/check-exists", async (req, res) => {
  try {
    const { gstin } = req.body;
    const existingGst = await User.findOne({ 'businessDetails.gstNumber': gstin });

    return res.json({
      exists: !!existingGst,
      message: existingGst ? 'GST number already registered' : 'GST number available'
    });

  } catch (error) {
    console.error('Error checking GST existence:', error);
    return res.status(500).json({
      exists: false,
      message: 'Error checking GST number'
    });
  }
});

router.post("/verify-gst", async (req, res) => {
    const { gstin } = req.body;
    const RAPID_API_KEY = process.env.RAPID_API_KEY;
    const RAPID_API_HOST = process.env.RAPID_API_HOST;

    console.log('Attempting GST verification with:', {
        gstin,
        host: RAPID_API_HOST,
        hasApiKey: !!RAPID_API_KEY
    });

    if (!RAPID_API_KEY || !RAPID_API_HOST) {
        return res.status(500).json({
            success: false,
            message: "API configuration is missing",
        });
    }

    try {
        const options = {
            method: 'GET',
            url: `https://${RAPID_API_HOST}/getGSTDetailsUsingGST/${gstin}`,
            headers: {
                'X-RapidAPI-Key': RAPID_API_KEY,
                'X-RapidAPI-Host': RAPID_API_HOST
            }
        };

        const response = await axios.request(options);

        console.log('Complete Raw API Response:', JSON.stringify(response.data, null, 2));

        if (response.status === 200) {
            const responseData = response.data.data;
            console.log('Backend: Raw response structure:', {
                legalName: responseData?.legalName,
                tradeName: responseData?.tradeName,
                constitutionOfBusiness: responseData?.constitutionOfBusiness,
                status: responseData?.status,
                registrationDate: responseData?.registrationDate,
                lastUpdateDate: responseData?.lastUpdateDate,
                natureOfBusinessActivity: responseData?.natureOfBusinessActivity,
                principalAddress: responseData?.principalAddress
            });

            const transformedData = {
                legalName: responseData.legalName,
                tradeName: responseData.tradeName,
                businessType: responseData.constitutionOfBusiness,
                gstStatus: responseData.status,
                gstinValid: responseData.status === 'Active',
                registrationDate: responseData.registrationDate,
                lastUpdateDate: responseData.lastUpdateDate,
                natureOfBusiness: Array.isArray(responseData.natureOfBusinessActivity)
                    ? responseData.natureOfBusinessActivity.join(', ')
                    : responseData.natureOfBusinessActivity,
                address: responseData.principalAddress?.address
                    ? `${responseData.principalAddress.address.buildingNumber || ''} ${responseData.principalAddress.address.buildingName || ''}, ${responseData.principalAddress.address.street || ''}, ${responseData.principalAddress.address.locality || ''}, ${responseData.principalAddress.address.district || ''}, ${responseData.principalAddress.address.stateCode || ''} - ${responseData.principalAddress.address.pincode || ''}`.trim()
                    : 'N/A',
                stateJurisdiction: responseData.stateJurisdiction,
                centerJurisdiction: responseData.centerJurisdiction,
                gstNumber: responseData.gstNumber,
                eInvoiceStatus: responseData.eInvoiceStatus
            };

            console.log('Backend: Transformed data:', transformedData);

            return res.status(200).json({
                success: true,
                data: transformedData
            });
        }

        return res.status(response.status).json({
            success: false,
            message: "Unexpected response from GST verification service",
        });

    } catch (error) {
        console.error("Full error details:", {
            message: error.message,
            stack: error.stack,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });

        if (error.response) {
            return res.status(error.response.status).json({
                success: false,
                message: error.response.data?.message || "GST verification failed",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
                details: process.env.NODE_ENV === 'development' ? error.response.data : undefined
            });
        } else if (error.request) {
            return res.status(503).json({
                success: false,
                message: "GST verification service is unavailable",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error during GST verification",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

export default router;
