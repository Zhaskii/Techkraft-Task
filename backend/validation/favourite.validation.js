import * as yup from "yup";

export const favouriteSchema = yup.object({
  propertyName: yup
    .string()
    .required("Property name is required")
    .max(255, "Property name must be at most 255 characters"),
  propertyLocation: yup
    .string()
    .notRequired()
    .max(255, "Property location must be at most 255 characters"),
  propertyPrice: yup
    .number()
    .notRequired()
    .min(0, "Property price cannot be negative")
    .typeError("Property price must be a number"),
});
