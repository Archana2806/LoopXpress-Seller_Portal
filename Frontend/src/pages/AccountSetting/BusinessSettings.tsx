import React, { useState, useEffect } from "react";
import useUserInfo from "../../hooks/useUserInfo";

const BusinessSettings = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessType, setBusinessType] = useState("");

  const { userInfo, loading, error } = useUserInfo();

  // Populate the state when userInfo is available
  useEffect(() => {
    if (userInfo?.businessDetails) {
      setBusinessName(userInfo.businessDetails.businessName || "");
      setBusinessEmail(userInfo.businessDetails.businessEmail || "");
      setBusinessPhone(userInfo.businessDetails.businessPhone || "");
      setBusinessType(userInfo.businessDetails.businessType || "");
    }
  }, [userInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Business Name:", businessName);
    console.log("Business Email:", businessEmail);
    console.log("Business Phone:", businessPhone);
    console.log("Business Type:", businessType);
    // Add API call or saving logic here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Business Settings
          </h3>
        </div>
        <div className="p-7">
          <form onSubmit={handleSubmit}>
            <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="businessName"
              >
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                placeholder="Enter your business name"
              />
            </div>

            <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="businessEmail"
              >
                Business Email
              </label>
              <input
                id="businessEmail"
                type="email"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                placeholder="Enter your business email"
              />
            </div>

            <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="businessPhone"
              >
                Business Contact Number
              </label>
              <input
                id="businessPhone"
                type="text"
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                placeholder="Enter your business contact number"
              />
            </div>

            <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="businessType"
              >
                Business Type
              </label>
              <select
                id="businessType"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
              >
                <option value="" disabled>
                  Select your business type
                </option>
                <option value="Retailer">Retailer</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Distributor">Distributor</option>
                <option value="Service Provider">Service Provider</option>
              </select>
            </div>

            <div className="flex justify-end gap-6">
              <button
                type="submit"
                className="inline-flex items-center rounded bg-orange-500 px-8 py-3 text-center text-base font-semibold text-white transition-all duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessSettings;
