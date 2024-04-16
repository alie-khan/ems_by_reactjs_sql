import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/emp/employee_detail/" + id)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logoutHandler = () => {
    axios
      .get("http://localhost:3000/emp/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow ">
        <h2> Employee Management System </h2>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center m-5 ">
        <h2 className="mt-2 mb-2">Profile Of {employee.name}</h2>

        <img
          src={`http://localhost:3000/Images/` + employee.image}
          className="employee_img_detail mb-4"
        />
        <h3>Name: {employee.name}</h3>
        <h3>Email: {employee.email}</h3>
        <h3>Salary: {employee.salary}</h3>
        <div>
          <button className="btn btn-warning m-2">Edit</button>
          <button className="btn btn-danger" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
