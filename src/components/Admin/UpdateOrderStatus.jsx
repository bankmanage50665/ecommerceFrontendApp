import {
  useNavigate,
  json,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

export default function UpdateOrderStatus() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleteing, setIsDeleting] = useState(false);
  const [orderStatus, setOrderStatus] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [paymentStatus, setPaymentStatus] = useState();

  const params = useParams();
  const token = useRouteLoaderData("root");

  const orderId = params.id;

  const navigate = useNavigate();

  function handleOnChangeUpdateStatus(event) {
    setOrderStatus(event.target.value);
  }

  async function handleUpdateOrderStatus() {
    try {
      setIsUpdating(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderStatus: orderStatus,
            paymentStatus: paymentStatus,
            deliveredWillBe: deliveryDate,
          }),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Field to update order status.");
      }
      setIsUpdating(false);
    } catch (err) {
      setIsUpdating(false);
      throw json(
        {
          message: err || "Something went wrong, Field to update order status.",
        },
        { status: 500 }
      );
    }

    navigate(`/admin/${orderId}`);
  }

  async function handleDeleteOrder() {
    try {
      setIsDeleting(true);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Field to delete order .");
      }
    } catch (err) {
      setIsDeleting(false);
      throw json(
        { message: err || "Something went wrong, Field to delete order." },
        { status: 500 }
      );
    }
    setIsDeleting(false);
    navigate("/admin");
  }

  return (
    <>
      <motion.div
        className="p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-lg rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <label
            htmlFor="deliveryStatus"
            className="block text-lg font-semibold text-gray-800"
          >
            Update Order Delivery Status
          </label>
          <select
            name="deliveryStatus"
            onChange={handleOnChangeUpdateStatus}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select status</option>
            <option value="Dispatch">Dispatch</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="paymentStatus"
            className="block text-lg font-semibold text-gray-800"
          >
            Update Order Payment Status
          </label>
          <select
            name="paymentStatus"
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Payment status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="deliveredWillBe"
            className="block text-lg font-semibold text-gray-800"
          >
            Update Order Delivery Date
          </label>
          <input
            type="date"
            id="deliveredWillBe"
            name="deliveredWillBe"
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex space-x-4 mt-8">
          <motion.button
            disabled={isDeleteing}
            onClick={handleDeleteOrder}
            whileHover={{ scale: isDeleteing ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center px-5 py-3 rounded-md text-white font-medium transition-all ${
              isDeleteing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 focus:bg-red-800"
            }`}
          >
            {isDeleteing ? (
              "Deleting..."
            ) : (
              <>
                <FiTrash2 className="mr-2" /> Delete Order
              </>
            )}
          </motion.button>

          <motion.button
            disabled={isUpdating}
            onClick={handleUpdateOrderStatus}
            whileHover={{ scale: isUpdating ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center px-5 py-3 rounded-md text-white font-medium transition-all ${
              isUpdating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:bg-blue-800"
            }`}
          >
            {isUpdating ? (
              "Updating..."
            ) : (
              <>
                <FiEdit className="mr-2" /> Update
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
