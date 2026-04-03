import express from "express";
import {
  addFavouriteController,
  deleteFavouriteController,
  getFavouriteController,
} from "../controller/favourite.controller.js";
import { isBuyer } from "../middleware/authentication.middleware.js";

const router = express.Router();

router.post("/add/:propertyId", isBuyer, addFavouriteController);
router.get("/list", isBuyer, getFavouriteController);
router.delete("/remove/:favId", isBuyer, deleteFavouriteController);

export { router as favouriteRoute };
