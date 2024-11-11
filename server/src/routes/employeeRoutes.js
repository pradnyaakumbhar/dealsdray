import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController.js';

const router = express.Router();

// get all employees route
router.get('/', getAllEmployees);

//get single employee
router.get('/:id', getEmployeeById);

//create new employee
router.post('/', createEmployee);

//update an existing employee
router.put('/:id', updateEmployee);

//delete employee
router.delete('/:id', deleteEmployee);

export default router;
