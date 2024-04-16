import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Employee() {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/get_employee")
      .then((result) => {
        setEmployee(result.data.Result);
        console.log(employee);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="m-5">
      <div className="d-flex justify-content-center">
        <h2>Employee</h2>
      </div>
      <Link to="/dashboard/addEmployee" className="btn btn-primary">
        Add Employee
      </Link>
      <div className="mt-5">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employee.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    className="employee_img"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>{e.category_id}</td>
                <td>
                  <Link
                    to={`/dashboard/editEmployee/` + e.id}
                    className="btn btn-warning me-1"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
