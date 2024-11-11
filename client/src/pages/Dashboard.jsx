import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import dateFormat from 'dateformat';
const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7000/api/employees', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Allowed-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch(() => toast.error('Failed to load employees'));
  }, []);
  console.log(employees);

  const deleteEmployee = (id) => {
    fetch(`http://localhost:7000/api/employees/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setEmployees(employees.filter((emp) => emp.f_id !== id));
          toast.success('Employee deleted successfully');
        } else {
          toast.error('Failed to delete employee');
        }
      })
      .catch(() => toast.error('Failed to delete employee'));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>
      <Link
        to="/create-employee"
        className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Employee
      </Link>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Id</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Mobile No.</th>
            <th className="border px-4 py-2">Designation</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Create Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.f_id}>
              <td className="border px-4 py-2">{emp.f_id}</td>
              <td className="border px-4 py-2">{emp.f_Image}</td>
              <td className="border px-4 py-2">{emp.f_Name}</td>
              <td className="border px-4 py-2">{emp.f_Email}</td>
              <td className="border px-4 py-2">{emp.f_Mobile}</td>
              <td className="border px-4 py-2">{emp.f_Designation}</td>
              <td className="border px-4 py-2">{emp.f_gender}</td>
              <td className="border px-4 py-2">{emp.f_Course}</td>
              <td className="border px-4 py-2">
                {dateFormat(emp.f_createdate, 'dd-mm-yyyy')}
              </td>
              <td className="border px-4 py-2">
                <Link
                  to={`/edit-employee/${emp.f_id}`}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteEmployee(emp.f_id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
