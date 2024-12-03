import { useState, useEffect } from 'react';

interface PersonalDetails {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
}
interface BusinessDetails {
    businessName: string;
    businessType: string;
    businessPhone: string;
    businessEmail: string;
    gstNumber: string;
}
interface BankDetails {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
}

interface UserInfo {
    _id: string;
    personalDetails: PersonalDetails;
    businessDetails: BusinessDetails;
    bankDetails: BankDetails;
}

interface UserInfoError {
    message: string;
}

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<UserInfoError | null>(null);

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
                setUserInfo(data);
                setError(null); // Clear errors if successful
            } catch (err: any) {
                const message = err.message || 'Failed to fetch user info';
                setError({ message });
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const updateUserInfo = async (updatedData: Partial<UserInfo>) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('User not authenticated. Please log in.');
            }

            const response = await fetch('/api/users/update-user-info', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user info');
            }

            const updatedUser = await response.json();
            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                ...updatedUser,
            })); // Merge updated data with existing user info
            setError(null); // Clear errors if successful
        } catch (err: any) {
            const message = err.message || 'Failed to update user info';
            setError({ message });
        } finally {
            setLoading(false);
        }
    };

    return { userInfo, loading, error, updateUserInfo };
};

export default useUserInfo;
