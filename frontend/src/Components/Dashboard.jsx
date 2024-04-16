import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const logoutHandler = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="bg-dark col-auto px-0">
          <div className="d-flex flex-column align-items-center px-3 pt-2 text-white ">
            <strong className="text-decoration-none text-white pb-4 pt-3">
              {" "}
              <h4> Admin Dashboard </h4>{" "}
            </strong>
            <ul
              className="nav nav-pills flex-column align-items-center vh-100"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className=" nav-link px-0 text-decoration-none text-white"
                >
                  <i className="fs-4 bi-speedometer"></i>
                  <strong className="ms-2">Dashboard</strong>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/dashboard/category"
                  className=" nav-link px-0 text-decoration-none text-white"
                >
                  <i className="fs-4 bi-columns"></i>
                  <strong className="ms-2">Category</strong>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className=" nav-link px-0 text-decoration-none text-white"
                >
                  <i className="fs-4 bi-people"></i>
                  <strong className="ms-2">Employee Management</strong>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 text-decoration-none text-white "
                >
                  <i className="fs-4 bi-person"></i>
                  <strong className="ms-2">Profile</strong>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  onClick={logoutHandler}
                  className="nav-link text-decoration-none text-white px-0"
                >
                  <i className="fs-4 bi-power"></i>
                  <strong className="ms-2">LogOut</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-0 m-0">
          <div className=" shadow d-flex justify-content-center pt-2">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
