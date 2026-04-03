import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    propertyLocation: {
      type: String,
    },
    propertyPrice: {
      type: Number,
    },
  },
  { timestamps: true },
);

const PropertyTable = mongoose.model("Property", propertySchema);

export default PropertyTable;
