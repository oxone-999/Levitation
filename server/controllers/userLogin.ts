import User from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
      user = await User.findOne({ username: email });
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ status: "ok", data: token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "Error logging in" });
  }
};

export default Login;
