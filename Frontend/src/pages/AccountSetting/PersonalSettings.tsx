import React, { useState } from 'react';
import useUserInfo from '../../hooks/useUserInfo';

const PersonalSettings = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {userInfo ,loading,error} = useUserInfo();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        {loading && <p>Loading user information...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder={userInfo?.personalDetails.fullName}
                        defaultValue={userInfo?.personalDetails.fullName}
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="last name"
                        defaultValue=""
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
                      placeholder="phone Number"
                      defaultValue={userInfo?.personalDetails.phoneNumber}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email Address
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder="Email Address"
                      defaultValue= {userInfo?.personalDetails.email}
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
                      placeholder="Address"
                      defaultValue={userInfo?.personalDetails.address}
                    />
                  </div>

                  {/* <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-orange-500 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-orange-500"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="********"
                    />
                  </div> */}

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

          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Profile Photo
                </h3>
              </div>
              <div className="p-7">
                <div className="text-center">
                  {profileImage ? (
                    <img
                      className="mb-5 inline-block h-24 w-24 rounded-full object-cover"
                      src={profileImage}
                      alt="user image"
                    />
                  ) : (
                    <div className="mb-5 inline-block h-24 w-24 rounded-full bg-gray-300 animate-pulse" />
                  )}
                  <div>
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer inline-flex items-center justify-center rounded bg-primary py-2 px-5 text-white dark:bg-meta-4"
                    >
                      <span>Upload Image</span>
                      <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalSettings;
