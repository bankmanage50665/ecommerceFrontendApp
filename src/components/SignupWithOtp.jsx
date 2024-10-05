import { motion } from "framer-motion";
import { FaUser, FaPhone } from "react-icons/fa";
import {
  Form,
  Link,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import React from "react";
import { PulseLoader } from "react-spinners";

const inputClasses =
  "w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300";
const labelClasses = "block mb-2 text-sm font-medium text-gray-600";
const buttonClasses =
  "w-full py-3 bg-yellow-400 text-white rounded-lg font-bold hover:bg-yellow-500 transition-all duration-300 ease-in-out";

function SignupWithOtp() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const error = useActionData();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-400 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
            Register
          </h2>

          {error && error.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md"
            >
              {error.message}
            </motion.div>
          )}

          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="phone" className={labelClasses}>
                <FaPhone className="inline mr-2" />
                Phone Number
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="tel"
                id="phone"
                name="phone"
                required
                minLength={10}
                maxLength={10}
                className={inputClasses}
                placeholder="Enter your phone number"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              type="submit"
              className={buttonClasses}
            >
              {isSubmitting ? (
                <PulseLoader color="#ffffff" size={10} />
              ) : (
                "Register"
              )}
            </motion.button>
          </Form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-yellow-500 hover:text-yellow-600 font-semibold"
            >
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SignupWithOtp;

export async function SignupWithOtpAction({ request, params }) {
  const formData = await request.formData();

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/register`,
      {
        method: "POST",
        body: JSON.stringify({ phoneNumber: formData.get("phone") }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 401) {
      return response;
    }

    const resData = await response.json();

    console.log(resData);

    if (!response.ok) {
      throw new Error(resData.message || "Field to loging user.");
    }
  } catch (err) {
    throw json(
      { message: "Field to login  please try again later." },
      { status: 500 }
    );
  }
  return redirect("/login");
}
