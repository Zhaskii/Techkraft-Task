import express from "express";
import connectDB from "./db/db.connection.js";
import dotenv from "dotenv";
import cors from "cors";
import { favouriteRoute } from "./routes/favourite.route.js";
import { userRoute } from "./routes/user.route.js";
import { propertyRoute } from "./routes/property.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

await connectDB();

app.use("/user", userRoute);
app.use("/favourite", favouriteRoute);
app.use("/property", propertyRoute);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
