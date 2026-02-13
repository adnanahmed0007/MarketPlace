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
        <div
            className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-6"
        >
            <div className="flex justify-center items-center h-screen">
                <button
                    onClick={handleClick}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg text-xl transition-all"
                >
                    🌾 Farmer Logging Out 🌾
                </button>
            </div>
        </div>
    );
};

export default Logout;
