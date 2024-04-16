import express from "express";
import con from "../Utils/db.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
router.post("/employee_login", (req, res) => {
  const sql = "SELECT * FROM employee WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in query" });
    }
    if (result.length > 0) {
      const email = result[0].email;
      bcrypt.compare(req.body.password, result[0].password, (error, response) => {
        if(error){
          return res.json({ Status: false, Error:"Wrong Password" });
        }
        if(response) {
          const token = Jwt.sign(
            { role: "employee", email: email, id : result[0].id },
            "Jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ Status: true, id : result[0].id });
        }
      });
      
    } 
    else {
     return res.json({Status:false , Error:"Wrong Email Or Password"})   
    }
  });
});

router.get("/employee_detail/:id", (req, res) => {
  
  const id = req.params.id;
  const sql = "SELECT * from employee where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false});
    return res.json(result)
  });
});

router.get("/logout",(req,res)=>{
  res.clearCookie("token")
  return res.json({Status:true})
})
export { router as EmployeeRouter };
