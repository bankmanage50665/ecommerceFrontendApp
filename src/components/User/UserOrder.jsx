import { ShoppingBag, Loader, AlertCircle } from "lucide-react";

import { userId } from "../../middleware/getToken";
import UserOrderItem from "./UserOrderItem";
import UserOrderDetails from "./UserOrderDetails";
import { useEffect, useState } from "react";

export default function UserOrders() {
  const [userOrders, setUserOrders] = useState();
  const orders = userOrders;

 

  const userid = userId();

  useEffect(() => {
    if (!userid) {
      return; // Don't send the request if the user is not logged in
    }

    async function handleFetchUserOrders() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/${userid}`);
        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message); // Handle error from the backend
        }

        // Do something with resData (set the user orders to the state, etc.)

        setUserOrders(resData.orders.orders);
      } catch (err) {
        console.error("Failed to load user orders, Please try again later."); // Log the error
      }
    }

    handleFetchUserOrders();
  }, [userid]); // This ensures the effect runs when userid changes

  return (
    <>
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        {orders ? (
          orders.length > 0 ? (
            <div className="max-w-7xl mx-auto space-y-8">
              <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-10 flex items-center justify-center">
                <ShoppingBag className="mr-2" size={32} />
                Your Orders
              </h1>
              {orders &&
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl"
                  >
                    <div className="p-6 lg:p-8">
                      <div className="border-b border-gray-200 pb-6 mb-6">
                        <UserOrderDetails
                          deliveredWillBe={order.deliveredWillBe}
                          orderStatus={order.orderStatus}
                          paymentStatus={order.paymentStatus}
                          totalPrice={order.totalPrice}
                          totalQuantity={order.totalQuantity}
                        />
                      </div>
                      <ul className="space-y-6">
                        {order &&
                          order.items.map((item) => (
                            <li
                              key={item.name}
                              className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 transition-all duration-300 hover:bg-gray-100"
                            >
                              <UserOrderItem
                                img={item.image[0]}
                                itemname={item.name}
                                quantity={item.quantity}
                                price={item.price}
                              />
                              <div className="text-sm text-gray-700 font-medium flex-grow">
                                <p className="text-lg font-semibold text-gray-900">
                                  {item.name}
                                </p>
                                <p>Quantity: {item.quantity}</p>
                                <p className="text-indigo-600">
                                  Price: ₹{item.price}
                                </p>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto text-center bg-white p-8 rounded-xl shadow-2xl">
              <AlertCircle className="mx-auto text-yellow-500 mb-4" size={64} />
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                No Orders Yet
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your
                orders here!
              </p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300">
                Start Shopping
              </button>
            </div>
          )
        ) : (
          <div className="flex flex-col justify-center items-center h-screen">
            <Loader className="animate-spin text-indigo-600 mb-4" size={48} />
            <p className="text-xl font-semibold text-gray-700">
              Loading your orders...
            </p>
          </div>
        )}
      </div>
    </>
  );
}
