import express from "express";
import con from "../Utils/db.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer, { diskStorage } from "multer";
import path from "path";

const router = express.Router();
router.post("/adminlogin", (req, res) => {
  const sql = " SELECT * FROM admin WHERE email = ? and password = ? ";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Error In Query" });
    }

    if (result.length > 0) {
      const email = result[0].email;
      const token = Jwt.sign(
        { role: "admin", email: email, id:result[0].id },
        "Jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong Email Or Password" });
    }
  });
});

router.post("/addcategory", (req, res) => {
  const sql = `INSERT INTO category (name) VALUES (?) `;
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Error In Query" });
    return res.json({ Status: true, Result: result });
  });
});

// store image start

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// store image end

router.post("/add_employee", upload.single("image"), (req, res) => {
  const sql = `INSERT INTO employee (name,email,password,phone,address,salary,category_id,image) VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Error In Query 1" });

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.phone,
      req.body.address,
      req.body.salary,
      req.body.category_id,
      req.file.filename,
    ];

    con.query(sql, [values], (err, result) => {
      if (err)
        return res.json({ Status: false, Error: "error in inserting..." });
      return res.json({ Status: true, Result: result });
    });
  });
});

router.get("/get_employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Message: "Error In Query" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/get_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Message: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/update_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE employee set name =?, email=?, phone =?, salary =?, address=?, category_id =? WHERE id = ? ";

  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.salary,
    req.body.address,
    req.body.category_id,
  ];
  con.query(sql, [...values, id], (err, result) => {
    if (err)
      return res.json({ Status: false, Message: "Error in query" + err });
    return res.json({ Status: true, Message: "Updated Employee ... " });
  });
});

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE from employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Error In query" });
    return res.json({ Status: true, Message: "Delete Successfully" });
  });
});

router.get("/admin_count", (req, res) => {
  const sql = "select count(id) as admin from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Error In Query" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Error in query " });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/salary_count", (req, res) => {
  const sql = "select sum(salary) as salary from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Error In Query" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_records", (req, res) => {
  const sql = "SELECT * from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Error in Query" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout",(req,res)=>{
  res.clearCookie("token")
  res.json({Status:true})
})

export { router as adminRouter };
