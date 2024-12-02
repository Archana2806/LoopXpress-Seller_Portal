import React, { useState, useEffect } from "react";

const BusinessDetails: React.FC<{
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}> = ({ data, onChange, onNext, onPrevious }) => {
  const [formErrors, setFormErrors] = useState<any>({});
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [gstDetails, setGstDetails] = useState<any>(data.gstDetails || null);

  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Update the data first
    onChange({ ...data, [name]: value });

    // Only verify GST when GST number is entered and matches format
    if (name === 'gstNumber') {
      if (gstRegex.test(value)) {
        // Store the original GST number
        const originalGstNumber = value;
        await verifyGstNumber(value);
        
        // Restore the original GST number after verification
        onChange({
          ...data,
          [name]: originalGstNumber,
          businessName: data.businessName,
          businessType: data.businessType,
          address: data.address
        });
      } else {
        setGstDetails(null); // Clear GST details if format doesn't match
      }
    }
  };

  // Simplified GST Verification Function
  const verifyGstNumber = async (gstNumber: string) => {
    setIsVerifying(true);
    try {
      console.log('Frontend: Sending GST verification request for:', gstNumber);

      const response = await fetch("http://localhost:5000/api/gst/verify-gst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gstin: gstNumber,
        }),
      });

      // Check if the response is valid JSON
      const contentType = response.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        throw new Error("Received non-JSON response");
      }

      console.log("Frontend: Received API Response:", result);

      if (!response.ok) {
        setFormErrors({
          ...formErrors,
          gstNumber: result.message || "GST verification failed."
        });
        setGstDetails(null);
        return false;
      }

      if (result.success && result.data) {
        console.log("Frontend: Setting GST Details:", result.data);
        setGstDetails(result.data);

        // Store both GST details and other business info in the main data
        onChange({
          ...data,
          businessName: result.data.legalName,
          businessType: result.data.businessType,
          address: result.data.address,
          gstDetails: result.data
        });
        
        setFormErrors({ ...formErrors, gstNumber: "" });
        return true;
      } else {
        setGstDetails(null);
        setFormErrors({
          ...formErrors,
          gstNumber: "Invalid GST details received"
        });
        return false;
      }
    } catch (error) {
      console.error("Frontend: GST Verification Error:", error);
      setFormErrors({
        ...formErrors,
        gstNumber: "Network error, please try again later.",
      });
      setGstDetails(null);
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const validateForm = () => {
    const errors: any = {};
    let isValid = true;

    if (!data.businessName || data.businessName.trim() === "") {
      errors.businessName = "Business Name is required.";
      isValid = false;
    }

    if (!data.businessType || data.businessType === "") {
      errors.businessType = "Please select a valid business type.";
      isValid = false;
    }

    if (!data.businessPhone || !/^\d{10}$/.test(data.businessPhone)) {
      errors.businessPhone = "Please enter a valid 10-digit phone number.";
      isValid = false;
    }

    if (!data.businessEmail || !/\S+@\S+\.\S+/.test(data.businessEmail)) {
      errors.businessEmail = "Please enter a valid email address.";
      isValid = false;
    }

    if (!data.gstNumber || !gstRegex.test(data.gstNumber)) {
      errors.gstNumber = "Please enter a valid GST Number.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleNext = async () => {
    if (!validateForm()) return;
    onNext();
  };

  // Add a useEffect to monitor gstDetails changes
  useEffect(() => {
    console.log("Frontend: Current gstDetails state:", gstDetails);
  }, [gstDetails]);

  // Add useEffect to update gstDetails when data changes
  useEffect(() => {
    if (data.gstDetails) {
      setGstDetails(data.gstDetails);
    }
  }, [data.gstDetails]);

  return (
    <div className="rounded-sm flex items-center justify-center w-full">
      <div className="w-full mx-auto max-w-180 shadow-default bg-white dark:border-strokedark h-full dark:bg-boxdark">
        <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
          <div className="w-full sm:p-8 xl:p-10">
            <h2 className="mb-6 text-2xl font-bold text-orange-500 dark:text-white sm:text-title-xl2">
              Sign Up to Loop
            </h2>

            <form>
              <span className="mb-1.5 block font-medium">
                Seller Business Details
              </span>
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Business Name */}
                <div className="col-span-12 lg:col-span-3">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Business Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="businessName"
                      value={data.businessName || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your Business name"
                      className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10"
                    />
                    {formErrors.businessName && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.businessName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Business Type */}
                <div className="col-span-12 lg:col-span-3">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Business Type
                  </label>
                  <div className="relative">
                    <select
                      name="businessType"
                      value={data.businessType || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10"
                    >
                      <option value="" disabled>
                        Select Business Type
                      </option>
                      <option value="Retailer">Retailer</option>
                      <option value="Wholesaler">Wholesaler</option>
                      <option value="Manufacturer">Manufacturer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Service Provider">Service Provider</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.businessType && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.businessType}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Phone and Email Section */}
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Business Phone */}
                <div className="col-span-12 lg:col-span-3">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Business Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="businessPhone"
                      value={data.businessPhone || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your Business Phone"
                      className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10"
                    />
                    {formErrors.businessPhone && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.businessPhone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Business Email */}
                <div className="col-span-12 lg:col-span-3">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Business Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="businessEmail"
                      value={data.businessEmail || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your Business Email"
                      className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10"
                    />
                    {formErrors.businessEmail && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.businessEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>



              {/* GST Number */}
              <div className="mt-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  GST Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="gstNumber"
                    value={data.gstNumber || ""}
                    onChange={handleInputChange}
                    placeholder="Enter GST Number"
                    className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10"
                  />
                  {isVerifying && (
                    <p className="text-blue-500 text-sm mt-1">Verifying GST...</p>
                  )}
                  {formErrors.gstNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.gstNumber}
                    </p>
                  )}
                </div>
              </div>


              {/* GST Details Display */}
              {gstDetails ? (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-3">GST Details</h3>
                  <div className="grid gap-2">
                    <p><strong>Legal Name: </strong>{gstDetails.legalName || 'N/A'}</p>
                    <p><strong>Trade Name: </strong>{gstDetails.tradeName || 'N/A'}</p>
                    <p><strong>Business Type: </strong>{gstDetails.businessType || 'N/A'}</p>
                    <p><strong>GST Status: </strong>
                      <span className={gstDetails.gstStatus === 'Active' ? 'text-green-500' : 'text-red-500'}>
                        {gstDetails.gstStatus || 'N/A'}
                      </span>
                    </p>
                    <p><strong>Registration Date: </strong>{gstDetails.registrationDate || 'N/A'}</p>
                    <p><strong>Last Updated: </strong>{gstDetails.lastUpdateDate || 'N/A'}</p>
                    <p><strong>Nature of Business: </strong>{gstDetails.natureOfBusiness || 'N/A'}</p>
                    <p><strong>Address: </strong>{gstDetails.address || 'N/A'}</p>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  {isVerifying ? (
                    <p className="text-blue-500">Verifying GST details...</p>
                  ) : (
                    gstDetails === null && <p className="text-gray-500">No GST details available</p>
                  )}
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className="w-24 rounded-lg border bg-gray p-4 text-dark hover:bg-opacity-90"
                  onClick={onPrevious}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="w-24 rounded-lg border bg-primary p-4 text-white hover:bg-opacity-90"
                  onClick={handleNext}
                  disabled={isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
