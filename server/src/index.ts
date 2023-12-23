require("dotenv").config();
import express from "express";
import connectDB from "../db";
import middleware from "../middleware/middleware";
import loginController from "../controllers/userLogin";
import signupController from "../controllers/userSignup";
const app = express();

app.use(middleware);

const port = process.env.PORT || 5001;

connectDB();

app.post("/api/auth/login", loginController);
app.post("/api/auth/signup", signupController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
