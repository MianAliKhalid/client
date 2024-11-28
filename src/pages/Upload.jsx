import React, { useState, useEffect } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const { user, isLoggedIn, authorizationToken } = useAuth();
  const navigate = useNavigate();

  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    personalDetails: "",
    city: "",
    province: "",
    country: "",
    image: null,
    userId: "",
    
  });
  const [preview, setPreview] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (user) {
      setUserFormData((prevFormData) => ({
        ...prevFormData,
        email: user.email,
        userId: user._id,
      }));
      // fetchImages();
    }
  }, [isLoggedIn, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserFormData({ ...userFormData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      personalDetails,
      city,
      province,
      country,
      userId,
      image,
    } = userFormData;

    console.log(userFormData);

    if (!firstName || !lastName || !email || !personalDetails || !city || !province || !country || !userId || !image) {
      toast.error("Please fill in all required fields and upload an image.");
      return;
    }

    // Prepare form data for upload
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", firstName);
    formDataToSend.append("lastName", lastName);
    formDataToSend.append("email", email);
    formDataToSend.append("personalDetails", personalDetails);
    formDataToSend.append("city", city);
    formDataToSend.append("province", province);
    formDataToSend.append("country", country);
    formDataToSend.append("userId", userId);
    formDataToSend.append("image", image);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/file/upload`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setUserFormData((prevFormData) => ({
          ...prevFormData,
          firstName: "",
          lastName: "",
          personalDetails: "",
          city: "",
          province: "",
          country: "",
          image: null,
        }));
        setPreview(null);
        // fetchImages(); 
      } else {
        toast.error( "Error uploading image and details.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image.");
    }
  };

  // const fetchImages = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/file/images", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       setUploadedImages(data); 
  //     } else {
  //       toast.error("Error fetching images.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching images:", error);
  //     toast.error("Error fetching images.");
  //   }
  // };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-black bg-gray-100 p-8">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Upload Your Details and Image
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={userFormData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={userFormData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                // required
              />
            </div>
          </div>

          {/* Other Form Fields */}
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={userFormData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                // required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2">Country</label>
              <input
                type="text"
                name="country"
                value={userFormData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2">Province</label>
              <input
                type="text"
                name="province"
                value={userFormData.province}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Personal Details</label>
            <textarea
              name="personalDetails"
              value={userFormData.personalDetails}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="4"
              // required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Upload Your Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {preview && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                Image Preview:
              </h3>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="mb-6 flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Upload
            </button>
          </div>
        </form>

        {/* Uploaded Images */}
        {/* <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Uploaded Images:</h2>
          <div className="flex flex-wrap gap-6">
            {uploadedImages.map((image, index) => (
              <div key={index} className="w-48 h-48 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={image.url} // Adjust as per your backend response
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Upload;
