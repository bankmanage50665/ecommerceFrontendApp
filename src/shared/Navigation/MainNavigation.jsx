import React, { useContext } from "react";
import { NavLink, Link, Form, useRouteLoaderData } from "react-router-dom";
import { motion } from "framer-motion";



import { MdLogin, MdLogout } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userId, getCreatorId } from "../../middleware/getToken";
import CartContext from "../../context/CartContext";

export default function MainNavigation() {
  const { items } = useContext(CartContext);
  const token = useRouteLoaderData("root");

  const creator = getCreatorId();
  const userid = userId();

 

  // Framer Motion transition settings
  const navItemMotion = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <>
      <motion.header
        className="w-full h-auto px-5 md:px-16 py-3 bg-gradient-to-br from-gray-900 to-indigo-900 text-white shadow-md transition-all duration-300 ease-in-out"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto">
          <ul className="flex flex-wrap justify-between items-center">
            <motion.li {...navItemMotion}>
              <Link to="/" className="block">
                <h1 className="h-10 w-10 font-bold">Trendify </h1>
              </Link>
            </motion.li>

            <motion.nav
              className="flex flex-wrap items-center space-x-1 sm:space-x-2 md:space-x-4"
              initial="hidden"
              animate="visible"
            >
              <NavLink
                to="products/cart"
                className={({ isActive }) =>
                  `relative flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-white hover:text-black hover:font-bold ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white hover:bg-white hover:text-black hover:font-bold"
                  }`
                }
                end
              >
                <motion.div className="relative" {...navItemMotion}>
                  <MdOutlineShoppingCart className="h-5 w-5 mb-1" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </motion.div>
                <motion.span className="text-xs" {...navItemMotion}>
                  Cart
                </motion.span>
              </NavLink>

              {!token && (
                <NavLink
                  to="signup"
                  className={({ isActive }) =>
                    `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-white hover:text-black hover:font-bold ${
                      isActive
                        ? "text-black bg-white"
                        : "text-white hover:bg-white hover:text-black"
                    }`
                  }
                >
                  <motion.div {...navItemMotion}>
                    <SiGnuprivacyguard className="h-5 w-5 mb-1" />
                    <span className="text-xs">Signup</span>
                  </motion.div>
                </NavLink>
              )}

              {!token && (
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-white hover:text-black hover:font-bold ${
                      isActive
                        ? "text-black bg-white"
                        : "text-white hover:bg-white hover:text-black"
                    }`
                  }
                >
                  <motion.div {...navItemMotion}>
                    <MdLogin className="h-5 w-5 mb-1" />
                    <span className="text-xs">Login</span>
                  </motion.div>
                </NavLink>
              )}

              {token && userid === creator && (
                <NavLink
                  to="admin"
                  className={({ isActive }) =>
                    `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-white hover:text-black hover:font-bold ${
                      isActive
                        ? "text-black bg-white"
                        : "text-white hover:bg-white hover:text-white"
                    }`
                  }
                >
                  <motion.div {...navItemMotion}>
                    <MdOutlineAdminPanelSettings className="h-5 w-5 mb-1" />
                    <span className="text-xs">Admin</span>
                  </motion.div>
                </NavLink>
              )}

              {token && (
                <Form method="post" action="/logout">
                  <motion.button
                    className="px-3 py-2 text-black bg-white text-xs rounded-lg hover:bg-white hover:text-black transition-colors duration-200"
                    {...navItemMotion}
                  >
                    <MdLogout className="h-5 w-5 mb-1" />
                    Logout
                  </motion.button>
                </Form>
              )}
            </motion.nav>
          </ul>
        </div>
      </motion.header>
    </>
  );
}
