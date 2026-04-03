"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios.instance";
import toast from "react-hot-toast";

interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
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
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 25% 75%, rgba(184,151,90,.15) 0%, transparent 65%), radial-gradient(ellipse 45% 40% at 80% 15%, rgba(184,151,90,.07) 0%, transparent 60%)",
            }}
          />

          {/* Top brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-6 h-6 border border-[#b8975a] rotate-45 flex-shrink-0" />
            <span className="text-[#b8975a] text-[0.6rem] tracking-[.28em] uppercase">
              Estate Portal
            </span>
          </div>

          {/* Center headline */}
          <div className="relative z-10">
            <p className="text-[#b8975a] uppercase tracking-[.25em] text-[0.6rem] mb-6 font-medium">
              Welcome Back
            </p>

            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-px bg-[#b8975a]" />
              <div className="w-2 h-2 border border-[#b8975a] rotate-45" />
            </div>

            <h1
              className="text-white font-light leading-[1.08] text-[3.5rem] lg:text-[4.2rem]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Good to
              <br />
              see you{" "}
              <em className="not-italic italic text-[#d4b483]">again.</em>
            </h1>

            <p className="mt-7 text-[0.82rem] text-white/35 leading-[1.8] max-w-[30ch]">
              Access your curated portfolio and manage preferred properties with
              intention.
            </p>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-white/20 text-[0.58rem] uppercase tracking-[.2em]">
            Made with ❤️ by Kunal Shrestha
          </div>
        </aside>

        {/* ── Right form panel ── */}
        <main className="flex flex-col justify-center px-8 py-14 sm:px-14 lg:px-20 bg-[#fafaf8]">
          <div className="max-w-md w-full mx-auto">
            {/* Mobile brand */}
            <div className="flex items-center gap-2 mb-10 md:hidden">
              <div className="w-5 h-5 border border-[#b8975a] rotate-45" />
              <span className="text-[#b8975a] text-[0.6rem] tracking-[.2em] uppercase">
                Estate Portal
              </span>
            </div>

            {/* Header */}
            <div className="mb-10">
              <p className="text-[#b8975a] uppercase tracking-[.22em] text-[0.62rem] mb-3 font-medium">
                Sign in
              </p>
              <h2
                className="text-[#0d0d12] font-normal leading-[1.1] text-[2.4rem]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Welcome back.
              </h2>
              <p className="text-[#7a7a82] text-[0.82rem] mt-2 leading-relaxed">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values: ILoginForm, { setSubmitting }) => {
                try {
                  const res = await axiosInstance.post("/user/login", values);
                  localStorage.setItem("accessToken", res.data.accessToken);
                  localStorage.setItem(
                    "userDetails",
                    JSON.stringify(res.data.userDetails),
                  );
                  toast.success(res.data.message);
                  navigate("/");
                } catch (error: any) {
                  toast.error(error.response?.data?.message || "Login failed");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form noValidate className="flex flex-col gap-5">
                  {/* Email */}
                  <div className="relative">
                    <Field
                      name="email"
                      type="email"
                      id="email"
                      placeholder=" "
                      className={[
                        "peer w-full px-4 pt-5 pb-2.5 rounded-sm",
                        "bg-[#f4f3ef] text-[0.9rem] text-[#0d0d12]",
                        "border outline-none transition-all duration-200",
                        "placeholder:text-transparent",
                        "focus:bg-white focus:ring-[3px] focus:ring-[#b8975a]/10",
                        touched.email && errors.email
                          ? "border-red-300 focus:border-red-400"
                          : "border-[#e2e0d8] focus:border-[#b8975a] hover:border-[#ccc9be]",
                      ].join(" ")}
                    />
                    <label
                      htmlFor="email"
                      className="
                        absolute left-4 top-4 text-[#7a7a82] text-[0.85rem] pointer-events-none
                        transition-all duration-200
                        peer-focus:top-1.5 peer-focus:text-[0.65rem] peer-focus:text-[#b8975a] peer-focus:font-medium peer-focus:tracking-wide
                        peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:tracking-wide
                      "
                    >
                      Email Address
                    </label>
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-400 text-[0.7rem] mt-1.5 ml-1 tracking-wide"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Field
                      name="password"
                      type="password"
                      id="password"
                      placeholder=" "
                      className={[
                        "peer w-full px-4 pt-5 pb-2.5 rounded-sm",
                        "bg-[#f4f3ef] text-[0.9rem] text-[#0d0d12]",
                        "border outline-none transition-all duration-200",
                        "placeholder:text-transparent",
                        "focus:bg-white focus:ring-[3px] focus:ring-[#b8975a]/10",
                        touched.password && errors.password
                          ? "border-red-300 focus:border-red-400"
                          : "border-[#e2e0d8] focus:border-[#b8975a] hover:border-[#ccc9be]",
                      ].join(" ")}
                    />
                    <label
                      htmlFor="password"
                      className="
                        absolute left-4 top-4 text-[#7a7a82] text-[0.85rem] pointer-events-none
                        transition-all duration-200
                        peer-focus:top-1.5 peer-focus:text-[0.65rem] peer-focus:text-[#b8975a] peer-focus:font-medium peer-focus:tracking-wide
                        peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:tracking-wide
                      "
                    >
                      Password
                    </label>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-400 text-[0.7rem] mt-1.5 ml-1 tracking-wide"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      relative w-full py-3.5 mt-1 rounded-sm overflow-hidden
                      bg-[#0d0d12] text-white
                      text-[0.75rem] font-medium tracking-[.22em] uppercase
                      transition-all duration-300 cursor-pointer
                      hover:bg-[#b8975a] hover:shadow-[0_8px_28px_rgba(184,151,90,.2)] hover:-translate-y-px
                      active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed
                    "
                  >
                    <span
                      className={`transition-opacity duration-200 ${isSubmitting ? "opacity-0" : "opacity-100"}`}
                    >
                      Sign In
                    </span>

                    {isSubmitting && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </span>
                    )}
                  </button>

                  {/* Register link */}
                  <div className="mt-5 pt-6 border-t border-[#e8e6de] text-center">
                    <p className="text-[0.82rem] text-[#7a7a82]">
                      New to the portal?{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="text-[#b8975a] font-medium cursor-pointer hover:text-[#0d0d12] transition-colors duration-200"
                      >
                        Create an account
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

export default LoginForm;
