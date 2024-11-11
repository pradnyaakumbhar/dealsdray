import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    f_id: '',
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: '',
    f_Image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:7000/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Allowed-Origin': '*',
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        toast.success('Employee created successfully');
        navigate('/dashboard');
      } else {
        toast.error('Failed to create employee');
      }
    });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Employee</h1>
      <form onSubmit={handleSubmit} className="m-4">
        <div className=" flex mb-4 items-center">
          <label className="block px-4 py-2 w-1/4 mr-2">Employee Id</label>
          <input
            type="text"
            name="f_id"
            value={formData.f_id}
            required
            onChange={handleChange}
            className="border border-gray-700 px-4 py-2 flex-1"
          />
        </div>
        <div className=" flex mb-4 items-center">
          <label className="block px-4 py-2 w-1/4 mr-2">Name</label>
          <input
            type="text"
            name="f_Name"
            value={formData.f_Name}
            required
            onChange={handleChange}
            className="border border-gray-700 px-4 py-2 flex-1"
          />
        </div>
        <div className=" flex mb-4 items-center">
          <label className="block px-4 py-2 w-1/4 mr-2">Email</label>
          <input
            type="email"
            name="f_Email"
            value={formData.f_Email}
            required
            onChange={handleChange}
            className="border border-gray-700 px-4 py-2 flex-1"
          />
        </div>
        <div className=" flex mb-4 items-center">
          <label className="block px-4 py-2 w-1/4 mr-2">Mobile no.</label>
          <input
            type="text"
            name="f_Mobile"
            value={formData.f_Mobile}
            required
            onChange={handleChange}
            className="border border-gray-700 px-4 py-2 flex-1"
          />
        </div>
        <div className=" flex mb-4 items-center">
          <label className="block px-4 py-2 w-1/4 mr-2">Designation</label>
          <input
            type="text"
            name="f_Designation"
            value={formData.f_Designation}
            required
            onChange={handleChange}
            className="border border-gray-700 px-4 py-2 flex-1"
          />
        </div>
        <div className=" flex mb-4 items-center">
          <label className="block px-4 py-2 w-1/4 mr-2">Gender</label>
          <select
            name="f_gender"
            value={formData.f_gender}
            onChange={handleChange}
            required
            className="border border-gray-700 px-4 py-2 flex-1"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className=" flex mb-4 items-center">
          <label className="block px-4 py-2 w-1/4 mr-2">Course</label>
          <input
            type="text"
            name="f_Course"
            value={formData.f_Course}
            required
            onChange={handleChange}
            className="border border-gray-700 px-4 py-2 flex-1"
          />
        </div>
        <div className=" flex mb-4 items-center">
          <label className="block px-4 py-2 w-1/4 mr-2">Image URL</label>
          <input
            type="text"
            name="f_Image"
            value={formData.f_Image}
            onChange={handleChange}
            className="border border-gray-700 px-4 py-2 flex-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
