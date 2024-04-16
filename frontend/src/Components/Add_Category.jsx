import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Add_Category = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/addcategory", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=" d-flex justify-content-center align-items-center vh-100">
      <div className="rounded-0 p-3 w-25 shadow">
        <h2 className="text-center">Add Category</h2>
        <form onSubmit={submitHandler}>
          <div className="p-2">
            <label className="pb-2" htmlFor="category">
              <strong>Category:</strong>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category Name"
              className="form-control rounded-0"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>
          <div className="p-2">
            <button type="submit" className="btn btn-primary w-100 p-2">
              {" "}
              Add{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Category;
