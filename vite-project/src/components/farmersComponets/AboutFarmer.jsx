import React, { useState } from "react";
import axios from "axios";

const AboutFarmer = () => {
  const [FarmerName, setFarmerName] = useState("");
  const [LandDetail, setLanddetail] = useState("");
  const [AboutFarmer, setAboutfarmer] = useState("");
  const [FarmerImage, setFarmerImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  async function HandleSubmit(e) {
    e.preventDefault();

    if (!FarmerName.trim() || !LandDetail.trim() || !AboutFarmer.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("FarmerName", FarmerName.trim());
      formData.append("LandDetail", LandDetail.trim());
      formData.append("AboutFarmer", AboutFarmer.trim());

      if (FarmerImage) {
        formData.append("FarmerImage", FarmerImage);
      }

      const response = await axios.post(
        "http://localhost:9808/api/sell/farmer/about/details",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);

        // Clear form
        setFarmerName("");
        setLanddetail("");
        setAboutfarmer("");
        setFarmerImage(null);
        setPreview(null);
      }
    } catch (e) {
      if (e.response?.status === 400) {
        alert(e.response.data.message);
      } else {
        alert("Something went wrong");
      }
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFarmerImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-green-200">

        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          🌾 Farmer Information Form
        </h2>

        <form onSubmit={HandleSubmit} className="space-y-5">

          {/* Farmer Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Farmer Name:
            </label>
            <input
              value={FarmerName}
              onChange={(e) => setFarmerName(e.target.value)}
              type="text"
              placeholder="Enter farmer name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Land Detail */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Land Detail:
            </label>
            <input
              value={LandDetail}
              onChange={(e) => setLanddetail(e.target.value)}
              type="text"
              placeholder="Enter land details"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* About Farmer */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              About Farmer:
            </label>
            <textarea
              value={AboutFarmer}
              onChange={(e) => setAboutfarmer(e.target.value)}
              rows="4"
              placeholder="Write about yourself"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Upload Farmer Image:
            </label>
            <input
              onChange={handleImageChange}
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg p-3 bg-white"
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="text-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-green-500 shadow-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition duration-300 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutFarmer;
