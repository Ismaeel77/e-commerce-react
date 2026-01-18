import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function AllOrders() {

  const [orders, setOrders] = useState(null);

  function getAllOrders() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
    .then(({data}) =>{
      setOrders(data.data)
      console.log(data.data);
    })
    .catch((err) => {console.log(err);
    })
  }

  useEffect(() =>{
    getAllOrders()
  },[])


  return (
    <>
      <section>
        <div className="p-6 bg-gray-50 min-h-screen">
          <h1 className="text-3xl font-bold mb-6">Order History</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders?.map((order) => (
              <div
                key={order?.id}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition"
              >
                <div className="flex flex-col justify-between items-start mb-2">
                  <div>
                    <img src={order?.cartItems[0]?.product?.imageCover}/>
                  </div>
                  <h2 className="text-lg font-semibold">{order?.cartItems[0]?.product?.title.split(" ", 2).join(" ")}</h2>
                  <p className={`my-2 py-1 rounded-full text-sm font-medium `}>
                    Delivery Status: 
                    {order?.isDelivered ? <span className="ms-1 bg-green-400 text-white p-2 rounded">Delivered</span> : 
                    <span className="ms-1 bg-red-400 text-white p-2 rounded">Not Delivered</span>}
                  </p>
                  <p className={`my-2 py-1 rounded-full text-sm font-medium `}>
                    Pay Status: 
                    {order?.isPaid ? <span className="ms-1 bg-green-400 text-white p-2 rounded">Paid</span> : 
                    <span className="ms-1 bg-red-400 text-white p-2 rounded">Not Paid</span>}
                  </p>
                  <p>Payment Method: {order?.paymentMethodType}</p>
                </div>
                <p className="text-gray-500 text-sm mb-1">Order ID: {order?.id}</p>
                <p className="text-gray-500 text-sm mb-1">Date: {order?.createdAt}</p>
              </div>
            ))}
          </div>
        </div>
        <Link to={'/'} className="bg-indigo-500 text-white py-2 px-4 rounded mx-auto w-fit block">Back To Home Page</Link>
      </section>
    </>
  );
}

export default AllOrders;
