import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserTable from "../model/user.model.js";

export const registerUserController = async (req, res) => {
  const newUser = req.body;

  const user = await UserTable.findOne({ email: newUser.email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const plainPassword = newUser.password;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  newUser.password = hashedPassword;

  await UserTable.create(newUser);

  return res.status(200).json({ message: "User registered successfully" });
};

export const loginUserController = async (req, res) => {
  const loginData = req.body;

  const user = await UserTable.findOne({ email: loginData.email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const plainPassword = loginData.password;
  const hashedPassword = user.password;
  const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const paylaod = { email: user.email };
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(paylaod, secretKey, { expiresIn: "1d" });

  return res.status(200).send({
    message: "Login successful",
    accessToken: token,
    userDetails: user,
  });
};
