import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

function Cart() {

  let [cartDetails, setCartDetails] = useState(null)
  let { getProductsFromCart, removeCartItem, updateCartItem,setCart } = useContext(CartContext)
  
  async function displayCart() {
    let response = await getProductsFromCart()
    setCartDetails(response.data)
    console.log(response);
    console.log(response.data.numOfCartItems);
    console.log(response.data.cartId);
    
  }

  async function removeItem(productId) {
    let response = await removeCartItem(productId)
    setCartDetails(response.data)
    setCart(response.data)
  }

    async function updateCart(productId, count) {
    if ( count < 1) {
      removeItem(productId)
    }
    let response = await updateCartItem(productId,count)
    setCartDetails(response.data)
  }
  
  useEffect(() => {
    displayCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section>
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {cartDetails?.data.products.map((product) =>
            <tr key={product.product.id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt={product.title} />
                </td>
                <td className="px-6 py-4 font-semibold text-heading">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <form className="max-w-xs mx-auto">
                    <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
                    <div className="relative flex items-center">
                      <button onClick={() => updateCart(product.product.id, product.count - 1)} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6 cursor-pointer">
                        <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
                      </button>
                      <span className="block mx-5">{product.count}</span>
                      <button onClick={() => updateCart(product.product.id, product.count + 1)} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6 cursor-pointer">
                        <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
                      </button>
                    </div>
                  </form>
                </td>
                <td className="px-6 py-4 font-semibold text-heading">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeItem(product.product.id)}
                    type="button"
                    className=" text-white w-full cursor-pointer rounded-md bg-indigo-500 box-border border border-indigo-500 hover:bg-indigo-700 shadow-xs font-medium px-4 py-2.5 focus:outline-none transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
              )}

            </tbody>
          </table>
        </div>
        <Link to={`/checkout`}>
          <button
            type="button"
            className=" text-white block mt-5 mx-auto cursor-pointer rounded-md bg-indigo-500 box-border border border-indigo-500 hover:bg-indigo-700 shadow-xs font-medium px-4 py-2.5 focus:outline-none transition-colors"
          >
            Checkout Now
          </button>
        </Link>

      </section>
    </>
  );
}

export default Cart;
