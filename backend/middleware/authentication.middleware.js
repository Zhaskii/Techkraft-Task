import jwt from "jsonwebtoken";
import UserTable from "../model/user.model.js";

export const isBuyer = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  let payload = null;
  try {
    const secretKey = process.env.SECRET_KEY;

    payload = jwt.verify(token, secretKey);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const user = await UserTable.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  if (user.role !== "buyer") {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  req.loggedInUserId = user._id;

  next();
};
