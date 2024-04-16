import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Start = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/employeeDetail/" + result.data.id);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 logInPage">
      <div className="  shadow border rounded w-25 p-3 logInForm ">
        <div className=" text-center text-white m-2">
          <h2>Login As</h2>
          <div className="d-flex justify-content-between mt-5">
            <button
              type="button"
              onClick={() => {
                navigate("/employeeLogin");
              }}
              className="btn btn-primary"
            >
              Employee
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/adminlogin");
              }}
              className="btn btn-success"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Start;
