import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit_Employee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    salary: null,
    category_id: null,
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

    axios
      .get("http://localhost:3000/auth/get_employee/" + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          phone: result.data.Result[0].phone,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          category_id: result.data.Result[0].category_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:3000/auth/update_employee/" + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-5  ">
      <div className="w-50 rounded-0 border p-4 shadow">
        <h2 className="text-center pb-3">Edit Employee</h2>
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
                value={employee.name}
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
                value={employee.email}
                onChange={(e) => {
                  setEmployee({ ...employee, email: e.target.value });
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
                value={employee.phone}
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
                value={employee.address}
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
                value={employee.salary}
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
                value={employee.category_id}
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

            {
              // <div className="pt-3">
              //   <label htmlFor="image">
              //     <strong>Select Image:</strong>
              //   </label>
              //   <input
              //     className="form-control rounded-0"
              //     type="file"
              //     name ="image"
              //     required
              //     onChange={(e) => {
              //       setEmployee({ ...employee, image: e.target.files[0]});
              //     }}
              //   />
              // </div>
            }

            <button
              type="submit"
              className="  btn btn-primary rounded-0 w-100 mt-3"
            >
              Edit Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit_Employee;
