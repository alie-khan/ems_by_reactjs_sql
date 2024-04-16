import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Category = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="m-2">
      <div className="pt-5 ms-4">
        <div className="justify-content-center d-flex">
          <h4>Category</h4>
        </div>
        <Link to="/dashboard/add_category" className="btn btn-primary">
          Add Category
        </Link>
      </div>
      <div className="ms-4 pt-2">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c) => (
              <tr>
                <td>{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Category;
