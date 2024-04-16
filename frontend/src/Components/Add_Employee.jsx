import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add_Employee = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    salary: null,
    category_id: null,
    image: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("phone", employee.phone);
    formData.append("address", employee.address);
    formData.append("salary", employee.salary);
    formData.append("category_id", employee.category_id);
    formData.append("image", employee.image);

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Erorr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center m-5  ">
      <div className="w-50 rounded-0 border p-4 shadow">
        <h2 className="text-center pb-3">Add Employee</h2>
        <div className=" p-3">
          <form onSubmit={submitHandler}>
            <div className="">
              <label htmlFor="name">
                <strong>Name:</strong>
              </label>
              <input
                name="name"
                className="form-control rounded-0"
                type="text"
                placeholder="Enter name here"
                required
                onChange={(e) => {
                  setEmployee({ ...employee, name: e.target.value });
                }}
              />
            </div>
            <div className="pt-3">
              <label htmlFor="email">
                <strong>Email:</strong>
              </label>
              <input
                name="email"
                className="form-control rounded-0"
                type="email"
                placeholder="Enter name here"
                required
                onChange={(e) => {
                  setEmployee({ ...employee, email: e.target.value });
                }}
              />
            </div>
            <div className="pt-3">
              <label htmlFor="password">
                <strong>Password:</strong>
              </label>
              <input
                name="password"
                className="form-control rounded-0"
                type="password"
                required
                onChange={(e) => {
                  setEmployee({ ...employee, password: e.target.value });
                }}
              />
            </div>

            <div className="pt-3">
              <label htmlFor="phone">
                <strong>Phone Number:</strong>
              </label>
              <input
                name="phone"
                className="form-control rounded-0"
                type="text"
                placeholder="Enter phone number here"
                required
                onChange={(e) => {
                  setEmployee({ ...employee, phone: e.target.value });
                }}
              />
            </div>

            <div className="pt-3">
              <label htmlFor="address">
                <strong>Address:</strong>
              </label>
              <input
                name="address"
                className="form-control rounded-0"
                type="text"
                placeholder="Enter name here"
                required
                onChange={(e) => {
                  setEmployee({ ...employee, address: e.target.value });
                }}
              />
            </div>
            <div className="pt-3">
              <label htmlFor="salary">
                <strong>Salary:</strong>
              </label>
              <input
                name="salary"
                className="form-control rounded-0"
                type="number"
                placeholder="Enter name here"
                required
                onChange={(e) => {
                  setEmployee({ ...employee, salary: e.target.value });
                }}
              />
            </div>

            <div className="pt-3">
              <label htmlFor="category">
                <strong>Category:</strong>
              </label>
              <select
                className="form-select"
                name="category_id"
                id="category_id"
                required
                onChange={(e) => {
                  setEmployee({ ...employee, category_id: e.target.value });
                }}
              >
                <option>Select a Category</option>
                {category.map((c) => {
                  return <option value={c.id}>{c.name}</option>;
                })}
              </select>
            </div>

            <div className="pt-3">
              <label htmlFor="image">
                <strong>Select Image:</strong>
              </label>
              <input
                className="form-control rounded-0"
                type="file"
                name="image"
                required
                onChange={(e) => {
                  setEmployee({ ...employee, image: e.target.files[0] });
                }}
              />
            </div>

            <button
              type="submit"
              className="  btn btn-primary rounded-0 w-100 mt-3"
            >
              Add Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Add_Employee;
