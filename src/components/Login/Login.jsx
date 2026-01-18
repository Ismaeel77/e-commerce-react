import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { setUserLogin } = useContext(UserContext);
  function handleLogin(values) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((apiResponse) => {
        if (apiResponse.data.message == "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          setIsLoading(false);
          navigate("/");
        }
        console.log(apiResponse);
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error);
      });
  }

  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with capital letter"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <section className="mx-auto">
        <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
          {apiError ? (
            <div className="bg-red-700 text-white mt-1 p-1 rounded">
              {apiError}
            </div>
          ) : null}
          <h2 className="text-indigo-500 text-3xl font-bold mb-6">Login Now</h2>
          <div className="relative z-0 w-full mb-7 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="text"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-indigo-500 appearance-none focus:outline-none focus:ring-0 focus:border-indigi-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your email
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
              Enter Your password
            </label>
            {formik.errors.password && formik.touched.password ? (
              <div className="bg-red-700 text-white mt-1 p-1 rounded">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="text-white cursor-pointer rounded-md bg-indigo-500 box-border border border-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none transition-colors"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
            <p className="ms-2">
              don't have account?{" "}
              <span className="font-bold">
                <Link to={"/register"}>Register Now</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
