import React, { useContext } from 'react';
import { NavLink, Link, Form, useRouteLoaderData } from "react-router-dom";
import { motion } from 'framer-motion';



import Logo from "../../assets/Logo.jfif";
import { MdLogin, MdLogout } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userId, getCreatorId } from '../../middleware/getToken';
import CartContext from '../../context/CartContext';

export default function MainNavigation() {
  const { items } = useContext(CartContext)
  const token = useRouteLoaderData("root")



  const creator = getCreatorId()
  const userid = userId()



  // Framer Motion transition settings
  const navItemMotion = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeInOut' }
  };



  return (
    <>
      {/* <header className="w-full h-auto  px-5 md:px-16 py-3  bg-white  shadow-md transition-all duration-300 ease-in-out ">
        <div className="max-w-7xl mx-auto">
          <ul className="flex flex-wrap justify-between items-center">
            <li>
              <Link to="" className="block">
                <img className="h-10 w-10 rounded-full" src={Logo} alt="Logo" />
              </Link>
            </li>
            <nav className="flex flex-wrap items-center space-x-1 sm:space-x-2 md:space-x-4">

              <NavLink
                to="products/cart"
                className={({ isActive }) =>
                  `relative flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold text-black hover:text-black ${isActive
                    ? 'bg-luxury-gold text-custom-blue'
                    : 'text-gray-600 hover:luxury-gold-hover hover:text-custom-blue'
                  }`
                }
                end
              >
                <div className="relative">
                  <MdOutlineShoppingCart className="h-5 w-5 mb-1" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </div>
                <span className="text-xs">Cart</span>
              </NavLink>

              {!token && <NavLink
                to="signup"
                className={({ isActive }) =>
                  `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold text-black hover:text-black  ${isActive
                    ? ' bg-luxury-gold text-black'
                    : 'text-gray-600 hover:bg-luxury-gold hover:text-black'
                  }`
                }
              >
                <SiGnuprivacyguard className="h-5 w-5  mb-1" />
                <span className="text-xs">Signup</span>
              </NavLink>}

              {!token && <NavLink
                to="login"
                className={({ isActive }) =>
                  `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold  text-black hover:text-black  ${isActive
                    ? ' bg-luxury-gold text-custom-blue'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-custom-blue'
                  }`
                }
              >
                <MdLogin className="h-5 w-5 mb-1 " />
                <span className="text-xs">Login</span>
              </NavLink>}


              <Form method="post" action="/logout">
                <button>
                  Logout
                </button>
              </Form>


              {token && userid === creator && <NavLink
                to="admin"
                className={({ isActive }) =>
                  `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold  text-black hover:text-black  ${isActive
                    ? ' bg-luxury-gold text-custom-blue'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-custom-blue'
                  }`
                }
              >
                <MdOutlineAdminPanelSettings className="h-5 w-5 mb-1 " />
                <span className="text-xs">Admin</span>
              </NavLink>}

            </nav>
          </ul>
        </div>
      </header> */}


      <motion.header
        className="w-full h-auto px-5 md:px-16 py-3 bg-white shadow-md transition-all duration-300 ease-in-out"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto">
          <ul className="flex flex-wrap justify-between items-center">
            <motion.li {...navItemMotion}>
              <Link to="/" className="block">
                <img className="h-10 w-10 rounded-full" src={Logo} alt="Logo" />
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
                  `relative flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-black hover:text-black ${isActive
                    ? 'bg-gold-500 text-custom-blue'
                    : 'text-gray-600 hover:bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 hover:text-custom-blue'
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
                <motion.span className="text-xs" {...navItemMotion}>Cart</motion.span>
              </NavLink>

              {!token && (
                <NavLink
                  to="signup"
                  className={({ isActive }) =>
                    `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-black hover:text-black ${isActive
                      ? ' bg-gold-500 text-black'
                      : 'text-gray-600 hover:bg-gold-500 hover:text-black'
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
                    `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-black hover:text-black ${isActive
                      ? ' bg-gold-500 text-custom-blue'
                      : 'text-gray-600 hover:bg-gold-500 hover:text-custom-blue'
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
                    `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-black hover:text-black ${isActive
                      ? ' bg-gold-500 text-custom-blue'
                      : 'text-gray-600 hover:bg-gold-500 hover:text-custom-blue'
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
                    className="px-3 py-2 text-black text-xs rounded-lg hover:bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 transition-colors duration-200"
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