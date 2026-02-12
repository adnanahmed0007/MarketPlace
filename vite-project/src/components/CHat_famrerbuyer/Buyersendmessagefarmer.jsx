 import React, { useEffect, useState } from 'react';
import img1 from "./thu-jan-12-2023-10-07-am50159.webp";
import axios from 'axios';

const Buyersendmessagefarmer = () => {
  const [chatThreads, setChatThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:9808/api/chats/chat/buyerto/farmer", {
        withCredentials: true,
      });
      setChatThreads(response.data.findsenderId);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  const handleDelete = async (chatId) => {
    alert(`Delete request for chat ID: ${chatId}`);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-4"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <div className="w-full max-w-2xl bg-white/90 rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-green-700">Your Chats with Farmers</h1>

        {loading ? (
          <p className="text-center text-gray-700">Loading chats...</p>
        ) : (
          chatThreads.map((chat, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center border-b pb-2 mb-3">
                <h2 className="text-xl font-semibold text-gray-800">👨‍🌾 {chat.farmerName}</h2>
                <button
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(chat._id)}
                >
                  Delete Chat
                </button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {chat.all_messages.map((msg, idx) => (
                  <div key={idx} className="flex flex-col items-end">
                    <div className="bg-green-100 text-gray-800 px-4 py-2 rounded-lg shadow max-w-xs">
                      <p className="text-base">{msg.text}</p>
                    </div>
                    <span className="text-xs text-gray-600 mt-1">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Buyersendmessagefarmer;
