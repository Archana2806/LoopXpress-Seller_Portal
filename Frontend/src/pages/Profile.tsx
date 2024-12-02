import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useState, useEffect } from 'react';

interface PersonalDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface UserInfo {
  personalDetails: PersonalDetails;
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('User not authenticated. Please log in.');
        }

        const response = await fetch('/api/users/user-info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user info');
        }

        const data = await response.json();
        console.log('User data:', data); // Log user data
        setUserInfo(data);
        setError(null); // Clear errors if successful
      } catch (err: any) {
        const message = err.message || 'Failed to fetch user info';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10 text-lg">{error}</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-lg border border-stroke bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg dark:from-gray-800 dark:to-gray-700">
        <div className="px-6 py-10 text-center">
          {/* Profile Image */}
          <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-orange-400 shadow-lg">
            <img
              src="https://via.placeholder.com/100"
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>

          {/* User Information */}
          <div className="mt-6">
            <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {userInfo?.personalDetails?.fullName || 'Name not available'}
            </h3>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-300">
              {userInfo?.personalDetails?.email || 'Email not available'}
            </p>
          </div>

          {/* Additional Information */}
          <div className="mt-8 space-y-6 text-left">
            <div className="mx-auto max-w-md px-6 py-4 rounded-lg bg-white shadow dark:bg-gray-800">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Phone:
              </h4>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {userInfo?.personalDetails?.phoneNumber || 'Phone not available'}
              </p>
            </div>
            <div className="mx-auto max-w-md px-6 py-4 rounded-lg bg-white shadow dark:bg-gray-800">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Address:
              </h4>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {userInfo?.personalDetails?.address || 'Address not available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
