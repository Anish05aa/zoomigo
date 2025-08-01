import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';

const Addvehicle = () => {
  const { adminToken, backendUrl } = useContext(AdminContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    rating: 3,          // Add default rating
    gearType: 'automatic', // Add default gear type
    fuelType: 'petrol',    // Add default fuel type
    location: {
      line1: '',
      city: '',
      state: '',
      country: '',
    },
    date: '',
    image: null,
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    // ownerId: '', // Add this
    ownerAddress: { // Add this
      line1: '',
      city: '',
      state: '',
      country: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast.error('Please select a valid image file (JPEG, PNG)');
      return;
    }

    setImageFile(file);
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.price || !formData.category ||
      !formData.description || !formData.location.line1 ||
      !formData.location.city || !formData.location.state ||
      !formData.location.country || !formData.date || !formData.image) {
      toast.error("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = new FormData();
      if (!imageFile) {
        return toast.error('Please upload a vehicle image')
      }

      // Required fields (match exactly with backend expectations)
      payload.append('name', formData.name.trim());
      payload.append('pricePerDay', formData.price);
      payload.append('category', formData.category.trim());
      payload.append('description', formData.description.trim());
      payload.append('rating', formData.rating);  // Add rating
      payload.append('gearType', formData.gearType);  // Add gearType
      payload.append('fuelType', formData.fuelType);
      payload.append('location', JSON.stringify({
        line1: formData.location.line1.trim(),
        city: formData.location.city.trim(),
        state: formData.location.state.trim(),
        country: formData.location.country.trim()
      }));
      payload.append('date', new Date(formData.date).toISOString());
      payload.append('image', formData.image);

      // Optional fields (only if provided)
      // if (formData.ownerId) payload.append('ownerId', formData.ownerId.trim());
      if (formData.ownerName?.trim()) payload.append('ownerName', formData.ownerName.trim());
      if (formData.ownerEmail?.trim()) payload.append('ownerEmail', formData.ownerEmail.trim());
      if (formData.ownerPhone?.trim()) payload.append('ownerPhone', formData.ownerPhone.trim());
      if (Object.values(formData.ownerAddress).some(v => v?.trim())) {
        payload.append('ownerAddress', JSON.stringify(formData.ownerAddress));
      }

      payload.append('isSystemOwned',
        // !formData.ownerId && 
        !formData.ownerName &&
        !formData.ownerEmail &&
        !formData.ownerPhone
      );


      // Debug: Show exactly what's being sent
      console.log('Payload entries:', Array.from(payload.entries()));

      const res = await axios.post(
        `${backendUrl}/api/admin/add-vehicle`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${adminToken}`
          }
        }
      );

      if (res.data.success) {
        toast.success('Vehicle added successfully!');
        // Reset form
        setFormData({
          name: '',
          price: '',
          category: '',
          description: '',
          rating: 3,          // Reset to default
          gearType: 'automatic', // Reset to default
          fuelType: 'petrol',    // Reset to default
          location: { line1: '', city: '', state: '', country: '' },
          date: '',
          image: null,
          ownerName: '',
          ownerEmail: '',
          ownerPhone: '',
          // ownerId: '',
          ownerAddress: { line1: '', city: '', state: '', country: '' }
        });
        setImageFile(null);
      }
      else {
        toast.error(data.message || 'Failed to add doctor')

      }
    } catch (err) {
      console.error('Full error response:', err.response?.data || err.message);
      toast.error(
        err.response?.data?.message ||
        'Failed to add vehicle. Please check all fields.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8 bg-white rounded shadow max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#E53935]">Add Vehicle</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Image Upload */}
        <div className='flex items-center gap-4 text-gray-600 col-span-full'>
          <label htmlFor='veh-img' className="cursor-pointer">
            <img
              className='w-20 h-20 object-cover bg-gray-100 rounded-full border'
              src={imageFile ? URL.createObjectURL(imageFile) : assets.upload_icon}
              alt="Vehicle preview"
            />
          </label>
          <input
            onChange={handleImageChange}
            type='file'
            id='veh-img'
            accept="image/*"
            hidden
            required
          />
          <p className="text-sm">Upload vehicle image</p>
        </div>

        {/* Required Fields */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Vehicle Name *"
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
          required
        />
        <input
          name="price"
          type="number"
          min="1"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price Per Day *"
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category *"
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description *"
          className="p-3 border rounded md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#E53935]"
          rows={3}
          required
        />

        {/* Rating Dropdown */}
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
        >
          <option value="1">★☆☆☆☆ (1 Star)</option>
          <option value="2">★★☆☆☆ (2 Stars)</option>
          <option value="3">★★★☆☆ (3 Stars)</option>
          <option value="4">★★★★☆ (4 Stars)</option>
          <option value="5">★★★★★ (5 Stars)</option>
        </select>

        {/* Gear Type Dropdown */}
        <select
          name="gearType"
          value={formData.gearType}
          onChange={handleChange}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
        >
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>

        {/* Fuel Type Dropdown */}
        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
        >
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
        </select>

        {/* Location */}
        <input
          name="location.line1"
          value={formData.location.line1}
          onChange={handleChange}
          placeholder="Address Line 1 *"
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
          required
        />
        <input
          name="location.city"
          value={formData.location.city}
          onChange={handleChange}
          placeholder="City *"
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
          required
        />
        <input
          name="location.state"
          value={formData.location.state}
          onChange={handleChange}
          placeholder="State *"
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
          required
        />
        <input
          name="location.country"
          value={formData.location.country}
          onChange={handleChange}
          placeholder="Country *"
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
          required
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
          required
        />

        {/* Optional Owner Info */}
        <div className="col-span-full mt-6 text-[#E53935] font-semibold text-lg">Owner Info(only for owner owned vehicle):</div>
        <input
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          placeholder="Owner Name"
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
        />
        {/* <input
          name="ownerId"
          value={formData.ownerId}
          onChange={handleChange}
          placeholder="Owner ID"
          className="p-2 border rounded"
        /> */}

        {/* <div className="col-span-full">
          <h4 className="font-medium">Owner Address</h4>
          <input
            name="ownerAddress.line1"
            type='text'
            value={formData.ownerAddress.line1}
            onChange={handleChange}
            placeholder="Address Line 1"
            className="p-2 border rounded"
          />
          <input
            name="ownerAddress.city"
            type='text'
            value={formData.ownerAddress.city}
            onChange={handleChange}
            placeholder="City"
            className="p-2 border rounded"
          />
          <input
            name="ownerAddress.state"
            type='text'
            value={formData.ownerAddress.state}
            onChange={handleChange}
            placeholder="State"
            className="p-2 border rounded"
          />
          <input
            name="ownerAddress.country"
            type='text'
            value={formData.ownerAddress.country}
            onChange={handleChange}
            placeholder="Country"
            className="p-2 border rounded"
          />
        </div> */}

        <input
          name="ownerEmail"
          type="email"
          value={formData.ownerEmail}
          onChange={handleChange}
          placeholder="Owner Email"
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
        />
        <input
          name="ownerPhone"
          value={formData.ownerPhone}
          onChange={handleChange}
          placeholder="Owner Phone"
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#E53935]"
        />

        <button
          type="submit"
          className="col-span-full bg-[#E53935] text-white font-semibold p-3 mt-6 rounded hover:bg-[#d32f2f] transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Vehicle'}
        </button>
      </form>
    </div>
  );
}


export default Addvehicle;