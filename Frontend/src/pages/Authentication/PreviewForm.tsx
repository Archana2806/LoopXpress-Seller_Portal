import React from "react";

interface PreviewFormProps {
    data: {
        personalDetails: any;
        businessDetails: {
            businessName: string;
            gstNumber: string;
            address?: string;
            gstDetails?: {
                address?: string;
                legalName?: string;
                tradeName?: string;
            };
        };
        bankDetails: any;
    };
    onPrevious: () => void;
    onSubmit: () => void;
}

const PreviewForm: React.FC<PreviewFormProps> = ({ data, onPrevious, onSubmit }) => {
    const { personalDetails, businessDetails, bankDetails } = data;

    console.log("Preview Form Data:", data);
    console.log("Business Details:", businessDetails);

    return (
        <div className="rounded-sm flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto max-w-180 shadow-default bg-white dark:border-strokedark h-full dark:bg-boxdark p-4 sm:p-6 lg:p-8">
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-orange-500 mb-4 sm:mb-6">Preview Your Details</h2>

                {/* Personal Details */}
                <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Personal Details</h3>
                    <div className="space-y-1 sm:space-y-2">
                        <p className="flex justify-between text-sm sm:text-base"><strong>Full Name:</strong> {personalDetails.fullName}</p>
                        <p className="flex justify-between text-sm sm:text-base"><strong>Email:</strong> {personalDetails.email}</p>
                        <p className="flex justify-between text-sm sm:text-base"><strong>Phone Number:</strong> {personalDetails.phoneNumber}</p>
                    </div>
                </div>

                {/* Business Details */}
                <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Business Details</h3>
                    <div className="space-y-1 sm:space-y-2">
                        <p className="flex justify-between text-sm sm:text-base"><strong>Business Name:</strong> {businessDetails.businessName}</p>
                        <p className="flex justify-between text-sm sm:text-base"><strong>GST Number:</strong> {businessDetails.gstNumber}</p>
                        <p className="flex flex-col text-sm sm:text-base">
                            <strong>Business Address:</strong>
                            <span className="mt-1">{businessDetails.gstDetails?.address || businessDetails.address || 'Address not available'}</span>
                        </p>
                    </div>
                </div>

                {/* Bank Details */}
                <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Bank Details</h3>
                    <div className="space-y-1 sm:space-y-2">
                        <p className="flex justify-between text-sm sm:text-base"><strong>Bank Name:</strong> {bankDetails.bankName}</p>
                        <p className="flex justify-between text-sm sm:text-base"><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
                        <p className="flex justify-between text-sm sm:text-base"><strong>Account Type:</strong> {bankDetails.accountType}</p>
                        <p className="flex justify-between text-sm sm:text-base"><strong>IFSC Code:</strong> {bankDetails.ifscCode}</p>
                        <p className="flex justify-between text-sm sm:text-base"><strong>Branch Name:</strong> {bankDetails.branchName}</p>
                        <p className="flex justify-between text-sm sm:text-base"><strong>Account Holder Name:</strong> {bankDetails.accountHolderName}</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-6 space-y-2 sm:space-y-0">
                    <button
                        onClick={onPrevious}
                        className="bg-gray-300 text-gray-700 px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-400"
                    >
                        Previous
                    </button>
                    <button
                        onClick={onSubmit}
                        className="bg-green-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-green-600"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreviewForm;
