import React, { useState, useEffect } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import axios from "axios";

const PasswordUpdate = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token not found. Please log in again.");
  
      const response = await axios.put(
        "/api/users/update-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setSuccess(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
  
      // Force logout after password update
      localStorage.removeItem("authToken"); // Clear the old token
  
      // Optionally redirect user to login page or show a message
      window.location.href = "/login"; // or show a success message prompting them to log in again
    } catch (err) {
      console.error("Error updating password:", err);
      setError(err.response?.data?.message || "Failed to update password.");
    }
  };
  

  return (
    <form onSubmit={handlePasswordUpdate}>
      <div className="mb-5.5">
        <label className="block text-sm font-medium" htmlFor="currentPassword">
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full rounded border py-3 px-4"
          required
        />
      </div>
      <div className="mb-5.5">
        <label className="block text-sm font-medium" htmlFor="newPassword">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded border py-3 px-4"
          required
        />
      </div>
      <div className="mb-5.5">
        <label className="block text-sm font-medium" htmlFor="confirmPassword">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded border py-3 px-4"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Update Password
      </button>
    </form>
  );
};

const PersonalSettings = () => {
  const { userInfo, loading, error, updateUserInfo } = useUserInfo();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token not found. Please log in again.");
      }

      const response = await axios.put(
        "/api/users/update-user-info",
        { personalDetails: formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = response.data;
      updateUserInfo(updatedUser);
      setSuccessMessage("Changes saved successfully!");
    } catch (err) {
      console.error("Error updating personal info:", err);
      setSubmitError("Failed to update personal information.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto max-w-270">
      {submitError && <p className="text-red-500">Error: {submitError}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

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
                    <label className="mb-3 block text-sm font-medium" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full rounded border py-3 px-4"
                      required
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full rounded border py-3 px-4"
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded border py-3 px-4"
                      required
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full rounded border py-3 px-4"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-6">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded bg-orange-500 px-8 py-3 text-white hover:bg-orange-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Password Update Section */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-8">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Change Password</h3>
            </div>
            <div className="p-7">
              <PasswordUpdate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSettings;
