import React, { useState, useEffect } from "react";
import useUserInfo from "../../hooks/useUserInfo";

const PersonalSettings = () => {
  const { userInfo, loading, error, updateUserInfo } = useUserInfo();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        fullName: userInfo.personalDetails.fullName || "",
        email: userInfo.personalDetails.email || "",
        phoneNumber: userInfo.personalDetails.phoneNumber || "",
        address: userInfo.personalDetails.address || "",
      });
    }
  }, [userInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null); // Clear previous errors
  
    try {
      // Call updateUserInfo and get the updated user object
      const updatedUser = await updateUserInfo({ personalDetails: formData });
  
      if (updatedUser && updatedUser.personalDetails) {
        // Update form data with the returned personalDetails
        setFormData({
          fullName: updatedUser.personalDetails.fullName || '',
          email: updatedUser.personalDetails.email || '',
          phoneNumber: updatedUser.personalDetails.phoneNumber || '',
          address: updatedUser.personalDetails.address || '',
        });
      }
  
      alert('Changes saved successfully!');
    } catch (err: any) {
      console.error('Error updating personal info:', err);
      setSubmitError(err.message || 'Failed to save changes. Please try again.');
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-270">
      {submitError && (
        <p className="text-red-500">Error: {submitError}</p>
      )}

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSaveChanges}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
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
      </div>
    </div>
  );
};

export default PersonalSettings;
