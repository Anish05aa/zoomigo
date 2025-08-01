import axios from 'axios';
import React, { useContext, useState } from 'react';
// import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      image && formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-sm">
      <div className="flex flex-col items-center mb-8">
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              className="w-40 h-40 rounded-full object-cover opacity-80"
              alt="profile"
            />
            {!image && (
              <img
                src={assets.upload_icon}
                className="w-8 absolute bottom-2 right-2 bg-white rounded-full p-1 shadow"
                alt="upload"
              />
            )}
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            src={userData.image}
            className="w-40 h-40 rounded-full object-cover"
            alt="profile"
          />
        )}

        {isEdit ? (
          <input
            className="mt-4 text-center text-2xl font-semibold bg-gray-100 p-1 rounded text-heading-dark"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="mt-4 text-2xl font-semibold text-heading-dark">{userData.name}</p>
        )}
      </div>

      <div className="space-y-8">
        {/* Contact Info */}
        <section>
          <p className="text-heading-dark font-semibold text-base mb-3 underline">Contact Information</p>
          <div className="grid grid-cols-[120px_1fr] gap-y-4 text-desc-dark">
            <p className="font-medium">Email:</p>
            <p className="text-blue-500">{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 rounded px-2 py-1 max-w-xs"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p>{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  className="bg-gray-100 rounded px-2 py-1 w-full"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  className="bg-gray-100 rounded px-2 py-1 w-full"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p>
                {userData.address.line1 !== '' ? userData.address.line1 : 'N/A'}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </section>

        {/* Basic Info */}
        <section>
          <p className="text-heading-dark font-semibold text-base mb-3 underline">Basic Information</p>
          <div className="grid grid-cols-[120px_1fr] gap-y-4 text-desc-dark">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="bg-gray-100 rounded px-2 py-1 max-w-[120px]"
                value={userData.gender}
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}

            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                className="bg-gray-100 rounded px-2 py-1 max-w-[160px]"
                value={userData.dob}
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </section>
      </div>

      {/* Save/Edit Button */}
      <div className="mt-10 flex justify-center">
        {isEdit ? (
          <button
            className="bg-[#ff6f61] text-white px-6 py-2 rounded-full hover:opacity-90 transition-all"
            onClick={() => {
              setLoading(true);
              updateUserProfileData();
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        ) : (
          <button
            className="border border-[#ff6f61] text-[#ff6f61] px-6 py-2 rounded-full hover:bg-[#ff6f61] hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
