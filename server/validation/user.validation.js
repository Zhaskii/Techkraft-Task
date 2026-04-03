import * as yup from "yup";

export const loginCredentialsSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .trim()
    .lowercase(),
  password: yup.string().required("Password is required").trim(),
});

export const registerUserSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .trim()
    .lowercase()
    .max(100, "Email cannot exceed 100 characters"),
  password: yup
    .string()
    .required("Password is required")
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password cannot exceed 30 characters"),
  firstName: yup
    .string()
    .required("First name is required")
    .trim()
    .max(100, "First name cannot exceed 100 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .trim()
    .max(100, "Last name cannot exceed 100 characters"),
  gender: yup
    .string()
    .required("Gender is required")
    .trim()
    .oneOf(
      ["male", "female", "others"],
      "Gender must be male, female, or others",
    ),
  role: yup
    .string()
    .required("Role is required")
    .trim()
    .oneOf(["buyer"], "Role must be 'buyer'"),
  address: yup
    .string()
    .required("Address is required")
    .trim()
    .max(255, "Address cannot exceed 255 characters"),
});
