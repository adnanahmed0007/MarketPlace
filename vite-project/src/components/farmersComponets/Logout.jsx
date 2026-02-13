import axios from 'axios';
import React from 'react';

import { useEffect } from 'react';
const Logout = () => {
    useEffect(() => {

    })
    async function handleClick() {
        try {
            const response1 = await axios.post(
                "http://localhost:9808/api/auth/logout/farmer",
                {},
                { withCredentials: true }
            );

            if (response1) {
                alert(response1.data.message);
                console.log(response1);
            } else {
                alert("Server error");
            }
        } catch (e) {
            if (e.response1 && e.response1.status === 400) {
                alert(e.response.data.message);
            }
            console.log(e);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-6">

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center max-w-md w-full">

                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-6">
                    Farmer Logout
                </h2>

                <p className="text-gray-600 mb-8">
                    Are you sure you want to logout from your account?
                </p>

                <button
                    onClick={handleClick}
                    className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
                >
                    🌾 Logout Now
                </button>

            </div>

        </div>

    );
};

export default Logout;
