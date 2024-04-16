import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/auth", adminRouter);
app.use("/emp", EmployeeRouter);
app.use(express.static("Public"));
app.use(cookieParser());

const userVerify = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    Jwt.verify(token, "Jwt_secret_key", (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Wrong Token " });
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    res.json({ Status: false, Error: "Not Authenticated" });
  }
};

app.get("/verify", userVerify, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id });
});

app.listen(port, () => {
  console.log("Application is Running ...");
});
