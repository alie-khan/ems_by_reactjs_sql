import React, { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [totalEmployee, setTotalEmployee] = useState();
  const [totalSalary, setTotalSalary] = useState();
  const [totalAdmin, setTotalAdmin] = useState();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/admin_count")
      .then((result) => {
        if (result.data.Status) {
          setTotalAdmin(result.data.Result[0].admin);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:3000/auth/employee_count")
      .then((result) => {
        if (result.data.Status) {
          setTotalEmployee(result.data.Result[0].employee);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3000/auth/salary_count")
      .then((result) => {
        if (result.data.Status) {
          setTotalSalary(result.data.Result[0].salary);
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3000/auth/admin_records")
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.Result);
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="m-5">
      <div className="p-5 d-flex justify-content-around">
        <div className="px-3 pt-3 shadow border w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
            <hr />
            <div>
              <h5>Total: {totalAdmin}</h5>
            </div>
          </div>
        </div>

        <div className="px-3 pt-3 shadow border w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
            <hr />
            <div>
              <h5>Total: {totalEmployee}</h5>
            </div>
          </div>
        </div>

        <div className="px-3 pt-3 shadow border w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
            <hr />
            <div>
              <h5>Total: {totalSalary}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h4>Admins Records</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr>
                <td>{a.email}</td>
                <td>
                  <button className="btn btn-warning mx-1">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
