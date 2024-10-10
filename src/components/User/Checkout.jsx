import { useContext, useState, useEffect } from "react";
import { Form, useNavigate, json } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHome,
  FiCreditCard,
  FiChevronDown,
} from "react-icons/fi";
import { motion } from "framer-motion";

import CartContext from "../../context/CartContext";
import { userId } from "../../middleware/getToken";
import { currencyFormatter } from "../../middleware/formatter";
import { getToken } from "../../middleware/getToken";
import { trackPageView, trackEvent } from "../../utils/FacebookPixel";

export default function Checkout() {
  const [isSubmitting, setIsSubmiting] = useState(false);

  const { items } = useContext(CartContext);

  const token = getToken();

  const userid = userId();
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView();
  }, []);

  const totalQuantity = items.reduce((totalNumberOfItem, item) => {
    return totalNumberOfItem + item.quantity;
  }, 0);

  const totalPrice = items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  console.log(items.map((item) => item._id));

  async function handlePlaceOrder(e) {
    trackEvent("InitiateCheckout", {
      content_ids: items.map((item) => item._id),
      content_type: "product",
      value: totalPrice,
      currency: "INR", // Adjust currency based on your needs
    });

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      setIsSubmiting(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/orders/place`,
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            items: items,
            creator: userid,
            totalPrice: totalPrice,
            totalQuantity,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message);
      }
    } catch (err) {
      setIsSubmiting(false);
      throw json(
        { message: "Field to place order, Please try again later." },
        { status: 404 }
      );
    }
    setIsSubmiting(false);
    navigate("/orders");
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const inputClasses =
    "w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-luxury-gold transition duration-300";

  return (
    <>
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl"
          variants={itemVariants}
        >
          <motion.div
            className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4"
            variants={itemVariants}
          >
            <span className="text-gray-600 font-medium text-xl">Total:</span>
            <span className="text-luxury-gold font-bold text-4xl">
              {currencyFormatter.format(totalPrice)}
            </span>
          </motion.div>

          <Form onSubmit={handlePlaceOrder} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                <FiUser className="inline-block mr-2 text-luxury-gold" /> Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                required
                className={inputClasses}
                placeholder="Enter your full name"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                <FiMail className="inline-block mr-2 text-luxury-gold" /> Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className={inputClasses}
                placeholder="Enter your email address"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-2"
              >
                <FiPhone className="inline-block mr-2 text-luxury-gold" /> Phone
                Number
              </label>
              <input
                name="phone"
                type="tel"
                id="phone"
                required
                minLength={10}
                maxLength={10}
                className={inputClasses}
                placeholder="Enter your phone number"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="city"
                className="block text-gray-700 font-semibold mb-2"
              >
                <FiMapPin className="inline-block mr-2 text-luxury-gold" />{" "}
                City/Town
              </label>
              <input
                name="city"
                type="text"
                id="city"
                required
                className={inputClasses}
                placeholder="Enter your city or town"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="pin"
                className="block text-gray-700 font-semibold mb-2"
              >
                <FiMapPin className="inline-block mr-2 text-luxury-gold" /> Pin
                Code
              </label>
              <input
                name="pin"
                type="number"
                id="pin"
                required
                minLength={6}
                maxLength={6}
                className={inputClasses}
                placeholder="Enter your pin code"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="address"
                className="block text-gray-700 font-semibold mb-2"
              >
                <FiHome className="inline-block mr-2 text-luxury-gold" />{" "}
                Address
              </label>
              <textarea
                name="address"
                id="address"
                required
                minLength={10}
                className={inputClasses}
                placeholder="Enter your full address"
                rows={3}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="paymentMethod"
                className="block text-gray-700 font-semibold mb-2"
              >
                <FiCreditCard className="inline-block mr-2 text-luxury-gold" />{" "}
                Payment Method
              </label>
              <div className="relative">
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  className={`${inputClasses} appearance-none pr-10`}
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="cod">Cash On Delivery</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-luxury-gold text-gray-900 font-bold py-4 rounded-lg transition duration-300 ease-in-out transform hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="w-6 h-6 border-t-2 border-gray-900 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="ml-2">Processing...</span>
                  </motion.div>
                ) : (
                  "Place Order"
                )}
              </button>
            </motion.div>
          </Form>
        </motion.div>
      </motion.div>
    </>
  );
}
