import mongoose from "mongoose";

export const validateMongoId = (req, res, next) => {
  const id = req.params.id;

  const isValid = mongoose.isValidObjectId(id);

  if (!isValid) {
    return res.status(401).send({ message: "Invalid ID!" });
  }

  next();
};
