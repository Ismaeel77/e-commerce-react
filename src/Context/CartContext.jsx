import axios from "axios";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let CartContext = createContext();

function CartContextProvider(props) {
  // let [cart, setCart] = useState();
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [cart, setCart] = useState(null)

  function getProductsFromCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers:headers,
    })
    .then((response) => response)
    .catch(error => {
      throw error;
    });
  }

  function removeCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
      headers:headers,
    })
    .then((response) => response)
    .catch(error => {
      throw error;
    });
  }
  // Update Cart Item like remove cart item
    function updateCartItem(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
      count
    },{
      headers:headers,
    })
    .then((response) => response)
    .catch(error => {
      throw error;
    });
  }

  function addToCart(productId) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: productId,
      },
      {
        headers: headers,
      }
    )
    .then((response) => response)
    .catch(error => {
      throw error;
    });
  }

    function checkout(cartId,url,formValues) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      {
        shippingAddress:formValues
      },
      {
        headers: headers,
      }
    )
    .then((response) => response)
    .catch(error => {
      throw error;
    });
  }

  async function getCart() {
    let response = await getProductsFromCart()
    setCart(response.data)
  }

  useEffect(() => {
    getCart()
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  return (
    <CartContext.Provider value={{cart, setCart, addToCart, getProductsFromCart, removeCartItem,updateCartItem,checkout,}}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
