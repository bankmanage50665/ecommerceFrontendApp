import React, { useContext, useEffect } from "react";
import { NavLink, Link, Form, useRouteLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

import { MdLogin, MdLogout } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userId, getCreatorId } from "../../middleware/getToken";
import CartContext from "../../context/CartContext";
import { trackPageView } from "../../utils/FacebookPixel";

export default function MainNavigation() {
  const { items } = useContext(CartContext);
  const token = useRouteLoaderData("root");

  const creator = getCreatorId();
  const userid = userId();

  useEffect(() => {
    trackPageView();
  }, []);
  // Framer Motion transition settings
  const navItemMotion = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.3, ease: "easeOut" },
  };

  return (
    <>
      <motion.header
        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div {...navItemMotion}>
              <Link to="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-white hover:text-gray-100 transition-colors">
                  Trendify
                </h1>
              </Link>
            </motion.div>

            <motion.nav
              className="flex items-center gap-3"
              initial="hidden"
              animate="visible"
            >
              <NavLink
                to="products/cart"
                className={({ isActive }) =>
                  `relative flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 
                ${
                  isActive
                    ? "bg-white text-indigo-600 shadow-md transform scale-105"
                    : "text-white hover:bg-white/10"
                }`
                }
              >
                <motion.div className="relative" {...navItemMotion}>
                  <MdOutlineShoppingCart className="h-6 w-6" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                  <span className="text-xs mt-1">Cart</span>
                </motion.div>
              </NavLink>

              {!token && (
                <>
                  <NavLink
                    to="signup"
                    className={({ isActive }) =>
                      `flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300
                    ${
                      isActive
                        ? "bg-white text-indigo-600 shadow-md transform scale-105"
                        : "text-white hover:bg-white/10"
                    }`
                    }
                  >
                    <motion.div {...navItemMotion}>
                      <SiGnuprivacyguard className="h-6 w-6" />
                      <span className="text-xs mt-1">Signup</span>
                    </motion.div>
                  </NavLink>

                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      `flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300
                    ${
                      isActive
                        ? "bg-white text-indigo-600 shadow-md transform scale-105"
                        : "text-white hover:bg-white/10"
                    }`
                    }
                  >
                    <motion.div {...navItemMotion}>
                      <MdLogin className="h-6 w-6" />
                      <span className="text-xs mt-1">Login</span>
                    </motion.div>
                  </NavLink>
                </>
              )}

              {token && userid === creator && (
                <NavLink
                  to="admin"
                  className={({ isActive }) =>
                    `flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300
                  ${
                    isActive
                      ? "bg-white text-indigo-600 shadow-md transform scale-105"
                      : "text-white hover:bg-white/10"
                  }`
                  }
                >
                  <motion.div {...navItemMotion}>
                    <MdOutlineAdminPanelSettings className="h-6 w-6" />
                    <span className="text-xs mt-1">Admin</span>
                  </motion.div>
                </NavLink>
              )}

              {token && (
                <Form method="post" action="/logout">
                  <motion.button
                    className="flex flex-col items-center px-4 py-2 rounded-lg bg-white text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
                    {...navItemMotion}
                  >
                    <MdLogout className="h-6 w-6" />
                    <span className="text-xs mt-1">Logout</span>
                  </motion.button>
                </Form>
              )}
            </motion.nav>
          </div>
        </div>
      </motion.header>
    </>
  );
}
