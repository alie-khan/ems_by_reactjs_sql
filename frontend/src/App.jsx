import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import Home from "./Components/Home.jsx";
import Employee from "./Components/Employee.jsx";
import Category from "./Components/Category.jsx";
import Profile from "./Components/Profile.jsx";
import Add_Category from "./Components/Add_Category.jsx";
import Add_Employee from "./Components/Add_Employee.jsx";
import Edit_Employee from "./Components/Edit_Employee.jsx";
import Start from "./Components/Start.jsx";
import EmployeeLogin from "./Components/EmployeeLogin.jsx";
import EmployeeDetail from "./Components/EmployeeDetail.jsx";
import ProtectRoute from "./Components/ProtectRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/employeeLogin" element={<EmployeeLogin />}></Route>
        <Route
          path="/employeeDetail/:id"
          element={
            <ProtectRoute>
              <EmployeeDetail />
            </ProtectRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          }
        >
          <Route path="" element={<Home />} />
          <Route path="/dashboard/employee" element={<Employee />} />
          <Route path="/dashboard/category" element={<Category />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/add_category" element={<Add_Category />} />
          <Route path="/dashboard/addEmployee" element={<Add_Employee />} />
          <Route
            path="/dashboard/editEmployee/:id"
            element={<Edit_Employee />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
