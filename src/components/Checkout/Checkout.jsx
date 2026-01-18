import { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
import { useParams } from "react-router-dom";

function Checkout() {
  let { checkout } = useContext(CartContext)
  let {id} = useParams()
  async function handleCheckout(cartId,url) {
    let { data } = await checkout(cartId,url,formik.values);
    console.log(data);
    console.log(id);
    if ( data.status === 'success') {
      // eslint-disable-next-line react-hooks/immutability
      // window.location.href = data.session.url
    }
    
  }

  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },
    onSubmit: () => handleCheckout(id,`https://mycart-ecommerce-react.vercel.app/`)
  })
  useEffect(() => {}, []);

  return (
    <>
      <section>
        <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
          <h2 className="text-indigo-500 text-3xl font-bold mb-6">CheckOut Now</h2>
          <div className="relative z-0 w-full mb-7 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-indigo-500 appearance-none focus:outline-none focus:ring-0 focus:border-indigi-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="details"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your Details
            </label>
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
              Enter Your Phone
            </label>
          </div>
          <div className="relative z-0 w-full mb-7 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-indigo-500 appearance-none focus:outline-none focus:ring-0 focus:border-indigi-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your City
            </label>
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="text-white cursor-pointer rounded-md bg-indigo-500 box-border border border-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none transition-colors"
            >
              Pay Now
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Checkout;
