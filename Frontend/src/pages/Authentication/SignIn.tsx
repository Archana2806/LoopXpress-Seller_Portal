import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthHeader } from "./AuthHeader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form from reloading the page

        // Client-side validation
        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }

        try {
            setIsSubmitting(true); // Disable form while submitting
            setErrorMessage(""); // Clear previous errors

            const response = await axios.post("http://localhost:5000/api/users/signin", {
                email,
                password,
            });

            console.log(response);

            // Assuming the backend sends back a JWT token
            const { token } = response.data;
            if (!token) {
                throw new Error("No token received from the server.");
            }

            // Save token to localStorage
            localStorage.setItem("authToken", token);

            // Redirect to dashboard
            window.location.href = "/dashboard";
        } catch (error: any) {
            console.error("Error logging in:", error);

            // Set an appropriate error message
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmitting(false); // Re-enable form after submission
        }
    };

    return (
        <>
            <AuthHeader />
            <div className="rounded-sm border flex items-center justify-center w-full py-4">
                <div className="w-full mx-auto max-w-[500px] shadow-default bg-white dark:border-strokedark h-full dark:bg-boxdark">
                    <div className="w-full sm:p-8 xl:p-10">
                        <span className="mb-1.5 block font-medium">Start for free</span>
                        <h2 className="mb-4 text-2xl font-bold text-orange-500 dark:text-white sm:text-title-xl2">
                            Sign In to Loop
                        </h2>

                        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrorMessage(""); // Clear error when typing
                                    }}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-orange-500"
                                    disabled={isSubmitting} // Disable while submitting
                                />
                            </div>

                            <div className="mb-6">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setErrorMessage(""); // Clear error when typing
                                        }}
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-orange-500"
                                        disabled={isSubmitting} // Disable while submitting
                                    />
                                    <button
                                        type="button"
                                        onClick={handleTogglePassword}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-5">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                    disabled={isSubmitting} // Disable while submitting
                                >
                                    {isSubmitting ? "Signing In..." : "Sign In"}
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p>
                                    Don’t have an account?{" "}
                                    <Link to="/auth/signup" className="text-primary">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
