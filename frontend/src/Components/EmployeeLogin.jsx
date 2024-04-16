import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  axios.defaults.withCredentials = true;
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/emp/employee_login", values)
      .then((result) => {
        if (result.data.Status) {
          localStorage.setItem("valid", true);
          navigate("/employeeDetail/" + result.data.id);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 logInPage">
      <div className="rounded-0 p-3 w-25 border logInForm ">
        <div className="text-warning">
          <strong>{error && error}</strong>
        </div>
        <h1 className="text-center">Employee Login</h1>
        <form onSubmit={submitHandler}>
          <div className="p-2">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Here Email"
              className="form-control rounded-0"
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
              }}
            />
          </div>

          <div className="p-2">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password "
              name="password"
              placeholder="Enter Here Password"
              className="form-control rounded-0"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <div className="p-2">
            <button type="submit" className="btn btn-primary w-100 p-2">
              {" "}
              Login{" "}
            </button>
          </div>
        </form>
        <div className="p-2">
          <input type="checkbox" name="tick" id="tick" className="me-2" />

          <label htmlFor="tick" className="">
            Terms And Conditions
          </label>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
