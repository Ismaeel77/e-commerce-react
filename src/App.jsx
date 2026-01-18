import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import AllOrders from "./components/AllOrders/AllOrders";


let routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element:<ProtectedRoute><Home /></ProtectedRoute>},
      { path: "products", element:<ProtectedRoute><Products /></ProtectedRoute>},
      { path: "productdetails/:id/:category", element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
      { path: "brands", element:<ProtectedRoute><Brands /></ProtectedRoute>},
      { path: "cart", element:<ProtectedRoute><Cart /></ProtectedRoute>},
      { path: "checkout", element:<ProtectedRoute><Checkout /></ProtectedRoute>},
      { path: "allorders", element:<ProtectedRoute><AllOrders /></ProtectedRoute>},
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// Take instance of query clinet
const queryClient = new QueryClient()

function App() {
  return (
    <>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <RouterProvider router={routes}></RouterProvider>
            <Toaster />
            <ReactQueryDevtools />
          </UserContextProvider>
        </QueryClientProvider>
      </CartContextProvider>

    </>
  );
}

export default App;
