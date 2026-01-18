import React, { useContext, useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  let { setUserLogin } = useContext(UserContext);
  // This function called by [formik.onSubmit method]
  function handleRegister(values) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((apiResponse) => {
        if (apiResponse.data.message === "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          navigate("/");
          setIsLoading(false);
        }
        console.log(apiResponse);
      })
      .catch((apiResponse) => {
        setIsLoading(false);
        console.log(apiResponse.response.data.message);
        setApiError(apiResponse.response.data.message);
      });

    console.log(values);
  }

  let schema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name min length is 3")
      .max(10, "Name max length is 3")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone should be egyptian number")
      .required("Phone is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with capital letter"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "Password and confirm password should be the same"
      )
      .required("Confirm password please"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    // validate:myValidate,
    validationSchema: schema,
    onSubmit: handleRegister, // handle submit action and send data automatically to handleRegister function
  });

  // function myValidate(values) {
  //   let errors = {};
  //   // validate name
  //   if (!values.name) {
  //     errors.name = "Name is required";
  //   } else if (!/^[A-Za-z]{3,5}$/.test(values.name)) {
  //     errors.name = "Name must start with capital letter";
  //   }

  //   // validate email
  //   if (!values.email) {
  //     errors.email = "Email is required";
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //     errors.email = "Invalid email address";
  //   }

  //   return errors;
  // }

  return (
    <>
      <section className="mx-auto">
        <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
          {apiError ? (
            <div className="bg-red-700 text-white mt-1 p-1 rounded">
              {apiError}
            </div>
          ) : null}
          <h2 className="text-indigo-500 text-3xl font-bold mb-6">
            Register Now
          </h2>

          <div className="relative z-0 w-full mb-7 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-indigo-500 appearance-none focus:outline-none focus:ring-0 focus:border-indigi-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your Name
            </label>
            {formik.errors.name && formik.touched.name ? (
              <div className="bg-red-700 text-white mt-1 p-1 rounded">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-7 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-indigo-500 appearance-none focus:outline-none focus:ring-0 focus:border-indigi-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your Email
            </label>
            {formik.errors.email && formik.touched.email ? (
              <div className="bg-red-700 text-white mt-1 p-1 rounded">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-7 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-indigo-500 appearance-none focus:outline-none focus:ring-0 focus:border-indigi-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Phone Number
            </label>
            {formik.errors.phone && formik.touched.phone ? (
              <div className="bg-red-700 text-white mt-1 p-1 rounded">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-7 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-indigo-500 appearance-none focus:outline-none focus:ring-0 focus:border-indigi-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Password
            </label>
            {formik.errors.password && formik.touched.password ? (
              <div className="bg-red-700 text-white mt-1 p-1 rounded">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-7 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-indigo-500 appearance-none focus:outline-none focus:ring-0 focus:border-indigi-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Confirm Password
            </label>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="bg-red-700 text-white mt-1 p-1 rounded">
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white cursor-pointer rounded-md bg-indigo-500 box-border border border-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none transition-colors"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
          </button>
        </form>
      </section>
    </>
  );
}

export default Register;
