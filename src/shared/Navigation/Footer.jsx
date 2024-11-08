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
      <footer className="w-full h-16   fixed bottom-0 left-0 right-0 shadow-lg z-50">
        <div className="max-w-screen-xl mx-auto h-full flex justify-evenly items-center">
          <NavLink
            to="products"
            className={({ isActive }) =>
              `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold text-black ${
                isActive
                  ? "bg-white text-black"
                  : "text-white hover:bg-white hover:text-black"
              }`
            }
            end
          >
            <MdOutlineShoppingBag className="h-5 w-5 mb-1" />
            <span className="text-xs">Shop</span>
          </NavLink>

          <NavLink
            to="products/cart"
            className={({ isActive }) =>
              `relative flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold text-black hover:text-black ${
                isActive
                  ? "bg-white text-black"
                  : "text-white hover:white hover:text-black"
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

          {token && (
            <NavLink
              to="orders"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold text-black hover:text-black ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-white hover:text-black"
                }`
              }
              end
            >
              <FaRegUserCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Orders</span>
            </NavLink>
          )}

          {!token && (
            <NavLink
              to="signup"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold text-black hover:text-black ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-white hover:text-black"
                }`
              }
              end
            >
              <SiGnuprivacyguard className="h-5 w-5 mb-1" />
              <span className="text-xs">Signup</span>
            </NavLink>
          )}
        </div>
      </footer>
    </>
  );
}
