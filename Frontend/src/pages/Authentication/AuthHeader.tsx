import React from 'react';
import { Link } from "react-router-dom"
export const AuthHeader = () => {

    return (
        <>
            <div
            className={`w-full z-50 text-white transition-all duration-500 ease-in-out bg-transparent mb-2 
                }`}
        >
            <div className="container mx-10">
                <nav className="flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-2">
                        <Link to="/">
                            <img
                                src={"/src/images/logo/looplogo.png"} alt="Logo" 
                                className="h-20"
                            />
                        </Link>
                    </div>

                </nav>
            </div>
        </div>
        </>
    )
}
