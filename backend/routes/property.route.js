import express from "express";
import { propertySchema } from "../validation/property.validation.js";
import validateReqBody from "../middleware/validate.req.body.js";
import {
  addPropertyController,
  getPropertyConrtoller,
} from "../controller/property.controller.js";
import { isBuyer } from "../middleware/authentication.middleware.js";

const router = express.Router();

router.post("/add", validateReqBody(propertySchema), addPropertyController);
router.get("/list", isBuyer, getPropertyConrtoller);

export { router as propertyRoute };
