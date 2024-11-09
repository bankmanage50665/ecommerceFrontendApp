import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { currencyFormatter } from "../../middleware/formatter.js";
import { motion } from "framer-motion";

import CartContext from "../../context/CartContext";
import { trackPageView } from "../../utils/FacebookPixel.js";

export default function Cart() {
  const { items, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    trackPageView();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const totalQuantity = items.reduce((totalNumberOfItem, item) => {
    return totalNumberOfItem + item.quantity;
  }, 0);

  const totalPrice = items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  return (
    <>
      <motion.div
        className="container mx-auto px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {items.length === 0 ? (
          <motion.div
            className="text-center bg-white rounded-xl shadow-2xl p-12"
            variants={itemVariants}
          >
            <FiShoppingCart className="mx-auto text-8xl text-gray-300 mb-6" />
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 text-lg">
              Add some luxurious products to start shopping
            </p>
            <Link
              to="/"
              className="mt-8 inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-8"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
              Your Cart
            </h2>
            <ul className="space-y-6">
              {items.map((item) => (
                <motion.li
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 rounded-lg p-6 shadow-md"
                  variants={itemVariants}
                >
                  <div className="flex items-center mb-4 sm:mb-0">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${item.image[0]}`}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md mr-6 shadow-lg"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">{item.brand}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="flex items-center bg-gray-200 rounded-full p-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold p-2 rounded-full"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <FiMinus />
                      </motion.button>
                      <span className="text-gray-800 font-medium mx-4">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold p-2 rounded-full"
                        onClick={() => addToCart(item)}
                      >
                        <FiPlus />
                      </motion.button>
                    </div>
                    <span className="text-gray-800 font-semibold text-xl ml-6">
                      {currencyFormatter.format(item.price.toFixed(2))}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-12 border-t border-gray-200 pt-8"
              variants={itemVariants}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">
                  Estimated Delivery
                </span>
                <span className="text-gray-800 text-xl">Within 72 hours</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">
                  Total Quantity
                </span>
                <span className="text-gray-800 font-bold text-xl">
                  {totalQuantity}
                </span>
              </div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-600 font-medium">Total</span>
                <span className="text-gray-800 font-bold text-3xl">
                  {currencyFormatter.format(totalPrice)}
                </span>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/checkout"
                  className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-lg text-center text-xl transition duration-300 ease-in-out hover:from-purple-700 hover:to-indigo-700"
                >
                  Proceed to Checkout
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
