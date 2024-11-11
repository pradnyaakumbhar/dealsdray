import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CreateEmployee from './pages/CreateEmployee';
import EditEmployee from './pages/EditEmployee';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
