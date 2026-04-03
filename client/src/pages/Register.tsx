"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios.instance";
import toast from "react-hot-toast";

interface IRegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob?: string;
  role: string;
  address: string;
}

/* ── Reusable floating-label text field ─────────────────────────────── */
const FloatingField = ({
  name,
  type = "text",
  label,
  hasError,
}: {
  name: string;
  type?: string;
  label: string;
  hasError: boolean;
}) => (
  <div className="relative">
    <Field
      name={name}
      type={type}
      id={name}
      placeholder=" "
      className={[
        "peer w-full px-4 pt-5 pb-2.5 rounded-sm",
        "bg-[#f4f3ef] text-[0.9rem] text-[#0d0d12]",
        "border outline-none transition-all duration-200",
        "placeholder:text-transparent",
        "focus:bg-white focus:ring-[3px] focus:ring-[#b8975a]/10",
        hasError
          ? "border-red-300 focus:border-red-400"
          : "border-[#e2e0d8] focus:border-[#b8975a] hover:border-[#ccc9be]",
      ].join(" ")}
    />
    <label
      htmlFor={name}
      className="
        absolute left-4 top-4 text-[#7a7a82] text-[0.85rem] pointer-events-none
        transition-all duration-200
        peer-focus:top-1.5 peer-focus:text-[0.65rem] peer-focus:text-[#b8975a] peer-focus:font-medium peer-focus:tracking-wide
        peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:tracking-wide
      "
    >
      {label}
    </label>
    <ErrorMessage
      name={name}
      component="p"
      className="text-red-400 text-[0.7rem] mt-1.5 ml-1 tracking-wide"
    />
  </div>
);

/* ── Reusable select field ───────────────────────────────────────────── */
const FloatingSelect = ({
  name,
  label,
  children,
  hasError,
}: {
  name: string;
  label: string;
  children: React.ReactNode;
  hasError: boolean;
}) => (
  <div className="relative">
    <label
      htmlFor={name}
      className="absolute left-3 top-1.5 text-[0.65rem] font-medium tracking-wide text-[#b8975a] pointer-events-none z-10"
    >
      {label}
    </label>
    <Field
      as="select"
      name={name}
      id={name}
      className={[
        "w-full px-4 pt-6 pb-2.5 rounded-sm appearance-none",
        "bg-[#f4f3ef] text-[0.9rem] text-[#0d0d12]",
        "border outline-none transition-all duration-200 cursor-pointer",
        "focus:bg-white focus:ring-[3px] focus:ring-[#b8975a]/10",
        hasError
          ? "border-red-300 focus:border-red-400"
          : "border-[#e2e0d8] focus:border-[#b8975a] hover:border-[#ccc9be]",
      ].join(" ")}
    >
      {children}
    </Field>
    {/* Custom chevron */}
    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#b8975a]">
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
    <ErrorMessage
      name={name}
      component="p"
      className="text-red-400 text-[0.7rem] mt-1.5 ml-1 tracking-wide"
    />
  </div>
);

/* ── Component ───────────────────────────────────────────────────────── */
const RegisterForm = () => {
  const navigate = useNavigate();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-[#fafaf8] font-['DM_Sans',sans-serif] selection:bg-[#b8975a]/20">
        {/* ── Left decorative panel ── */}
        <aside className="hidden md:flex flex-col justify-between p-14 bg-[#0d0d12] relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 30% 70%, rgba(184,151,90,.18) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(184,151,90,.08) 0%, transparent 60%)",
            }}
          />

          {/* Brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-6 h-6 border border-[#b8975a] rotate-45 flex-shrink-0" />
            <span className="text-[#b8975a] text-[0.6rem] tracking-[.28em] uppercase">
              Est. Platform
            </span>
          </div>

          {/* Headline */}
          <div className="relative z-10">
            <p className="text-[#b8975a] uppercase tracking-[.25em] text-[0.6rem] mb-6 font-medium">
              New Account
            </p>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-px bg-[#b8975a]" />
              <div className="w-2 h-2 border border-[#b8975a] rotate-45" />
            </div>
            <h1
              className="text-white font-light leading-[1.08] text-[3.5rem] lg:text-[4.2rem]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your next
              <br />
              chapter
              <br />
              <em className="not-italic italic text-[#d4b483]">starts here.</em>
            </h1>
            <p className="mt-7 text-[0.82rem] text-white/35 leading-[1.8] max-w-[30ch]">
              Create your account and gain access to a curated marketplace.
            </p>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-white/20 text-[0.58rem] uppercase tracking-[.2em]">
            Made with ❤️ by Kunal Shrestha
          </div>
        </aside>

        {/* ── Right form panel ── */}
        <main className="flex flex-col justify-center px-8 py-12 sm:px-14 lg:px-20 overflow-y-auto">
          <div className="max-w-md w-full mx-auto">
            {/* Mobile brand */}
            <div className="flex items-center gap-2 mb-10 md:hidden">
              <div className="w-5 h-5 border border-[#b8975a] rotate-45" />
              <span className="text-[#b8975a] text-[0.6rem] tracking-[.2em] uppercase">
                Est. Platform
              </span>
            </div>

            {/* Header */}
            <div className="mb-9">
              <p className="text-[#b8975a] uppercase tracking-[.22em] text-[0.62rem] mb-3 font-medium">
                New account
              </p>
              <h2
                className="text-[#0d0d12] font-normal leading-[1.1] text-[2.3rem]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Create your profile.
              </h2>
              <p className="text-[#7a7a82] text-[0.82rem] mt-2 leading-relaxed">
                Fill in your details to get started.
              </p>
            </div>

            <Formik
              initialValues={{
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                gender: "",
                role: "",
                address: "",
              }}
              onSubmit={async (values: IRegisterForm) => {
                try {
                  const res = await axiosInstance.post("/user/register", {
                    email: values.email,
                    password: values.password,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    gender: values.gender,
                    role: values.role,
                    address: values.address,
                  });
                  toast.success(res.data.message);
                  navigate("/login");
                } catch (error: any) {
                  toast.error(
                    error.response?.data?.message || "Registration failed",
                  );
                }
              }}
            >
              {({ touched, errors }) => (
                <Form noValidate className="flex flex-col gap-4">
                  {/* First + Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingField
                      name="firstName"
                      label="First Name"
                      hasError={!!(touched.firstName && errors.firstName)}
                    />
                    <FloatingField
                      name="lastName"
                      label="Last Name"
                      hasError={!!(touched.lastName && errors.lastName)}
                    />
                  </div>

                  {/* Email */}
                  <FloatingField
                    name="email"
                    type="email"
                    label="Email Address"
                    hasError={!!(touched.email && errors.email)}
                  />

                  {/* Password */}
                  <FloatingField
                    name="password"
                    type="password"
                    label="Password"
                    hasError={!!(touched.password && errors.password)}
                  />

                  {/* Address */}
                  <FloatingField
                    name="address"
                    label="Address"
                    hasError={!!(touched.address && errors.address)}
                  />

                  {/* Role + Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingSelect
                      name="role"
                      label="Role"
                      hasError={!!(touched.role && errors.role)}
                    >
                      <option value="" disabled hidden />
                      <option value="buyer">Buyer</option>
                    </FloatingSelect>

                    <FloatingSelect
                      name="gender"
                      label="Gender"
                      hasError={!!(touched.gender && errors.gender)}
                    >
                      <option value="" disabled hidden />
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </FloatingSelect>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="
                      relative w-full py-3.5 mt-2 rounded-sm cursor-pointer overflow-hidden
                      bg-[#0d0d12] text-white
                      text-[0.75rem] font-medium tracking-[.22em] uppercase
                      transition-all duration-300
                      hover:bg-[#b8975a] hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(184,151,90,.2)]
                      active:translate-y-0
                    "
                  >
                    Create Account
                  </button>

                  {/* Login redirect */}
                  <div className="mt-3 pt-6 border-t border-[#e8e6de] text-center">
                    <p className="text-[0.82rem] text-[#7a7a82]">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-[#b8975a] font-medium cursor-pointer hover:text-[#0d0d12] transition-colors duration-200"
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </main>
      </div>
    </>
  );
};

export default RegisterForm;
