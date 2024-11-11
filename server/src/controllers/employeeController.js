import Employee from '../modals/Employee.js';
import Joi from 'joi';

// Define a validation schema using Joi
// const employeeSchema = Joi.object({
//   f_Name: Joi.string().min(2).required().messages({
//     'string.min': 'Name must be at least 2 characters long',
//     'any.required': 'Name is required',
//   }),
//   f_Email: Joi.string().email().required().messages({
//     'string.email': 'Email must be a valid email address',
//     'any.required': 'Email is required',
//   }),
//   f_Mobile: Joi.string()
//     .pattern(/^[0-9]+$/)
//     .length(10)
//     .required()
//     .messages({
//       'string.pattern.base': 'Mobile must contain only numbers',
//       'string.length': 'Mobile must be 10 digits',
//       'any.required': 'Mobile is required',
//     }),
//   f_Designation: Joi.string().required().messages({
//     'any.required': 'Designation is required',
//   }),
//   f_Course: Joi.string().required().messages({
//     'any.required': 'Course is required',
//   }),
//   f_createdate: Joi.date().optional(),
// });

//get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

//get single employee
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({ f_id: id });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching employee details',
      error: error.message,
    });
  }
};
//create an employee
export const createEmployee = async (req, res) => {
  // const { error } = employeeSchema.validate(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }
  const {
    f_id,
    f_Image,
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_Course,
    f_gender,
  } = req.body;

  try {
    const newEmployee = new Employee({
      f_id,
      f_Image,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Course,
      f_gender,
    });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
};

//update an employee
export const updateEmployee = async (req, res) => {
  // const { error } = employeeSchema.validate(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }

  const { id } = req.params;
  const {
    f_Image,
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_Course,
    f_gender,
  } = req.body;
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { f_id: id },
      {
        f_Name,
        f_Image,
        f_Email,
        f_Mobile,
        f_Designation,
        f_Course,
        f_gender,
      },
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};

//delete an employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await Employee.findOneAndDelete({ f_id: id });

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};
