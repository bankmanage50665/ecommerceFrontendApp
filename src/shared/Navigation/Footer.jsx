import React, { useContext } from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";

import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";

import CartContext from "../../context/CartContext";

export default function Footer() {
  const { items } = useContext(CartContext);

  const token = useRouteLoaderData("root");

  return (
    <>
      <div className="h-16" /> {/* Spacer to prevent content overlap */}
      <footer className="w-full h-16 fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg z-50">
        <div className="max-w-screen-xl mx-auto h-full flex justify-evenly items-center px-4">
          <NavLink
            to="products"
            className={({ isActive }) =>
              `flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isActive
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-100 hover:bg-gray-700"
              }`
            }
            end
          >
            <MdOutlineShoppingBag className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Shop</span>
          </NavLink>

          <NavLink
            to="products/cart"
            className={({ isActive }) =>
              `relative flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isActive
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-100 hover:bg-gray-700"
              }`
            }
            end
          >
            <div className="relative">
              <MdOutlineShoppingCart className="h-6 w-6 mb-1" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {items.length}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Cart</span>
          </NavLink>

          {token ? (
            <NavLink
              to="orders"
              className={({ isActive }) =>
                `flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-100 hover:bg-gray-700"
                }`
              }
              end
            >
              <FaRegUserCircle className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Orders</span>
            </NavLink>
          ) : (
            <NavLink
              to="signup"
              className={({ isActive }) =>
                `flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-100 hover:bg-gray-700"
                }`
              }
              end
            >
              <SiGnuprivacyguard className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Signup</span>
            </NavLink>
          )}
        </div>
      </footer>
    </>
  );
}
