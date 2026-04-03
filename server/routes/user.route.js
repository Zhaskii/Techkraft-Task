import express from "express";
import {
  loginCredentialsSchema,
  registerUserSchema,
} from "../validation/user.validation.js";
import validateReqBody from "../middleware/validate.req.body.js";
import {
  loginUserController,
  registerUserController,
} from "../controller/user.controller.js";

const router = express.Router();

router.post(
  "/register",
  validateReqBody(registerUserSchema),
  registerUserController,
);

router.post(
  "/login",
  validateReqBody(loginCredentialsSchema),
  loginUserController,
);

export { router as userRoute };
