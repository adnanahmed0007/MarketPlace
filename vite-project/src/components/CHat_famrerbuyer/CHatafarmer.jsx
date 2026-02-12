 import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CHatafarmer = () => {
  const { id } = useParams(); // Farmer ID from URL
  const [senderId, setSenderId] = useState("");
  const [messages, setMessages] = useState("");
  const recevierId = id;

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("http://localhost:9808/api/buy/buyer/info", {
          withCredentials: true,
        });

        if (response.data && response.data.user) {
          setSenderId(response.data.user._id);
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    }

    fetchUserData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("hello")
      const response = await axios.post("http://localhost:9808/api/chats/chat/farmer/buyer", {
        senderId,
        recevierId,
        messages
      }, { withCredentials: true });
console.log(response)
      if (response && response.status === 200) {
        alert(response.data.message);
        setMessages(""); // Clear input after sending
      }
    } catch (e) {
      console.error("Message send error:", e);
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-2 text-center">Welcome to the Chat Room</h1>
        <p className="text-gray-700 text-center mb-6">
          You are now connected to the farmer. Feel free to send your message below regarding the crop you're interested in.
        </p>

        <div className="mb-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p><strong className="text-blue-800">Farmer ID:</strong> {recevierId}</p>
          <p><strong className="text-blue-800">Your ID:</strong> {senderId}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white">
          <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Your Message</label>
          <textarea
            id="message"
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
            placeholder="Type your message to the farmer..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default CHatafarmer;


