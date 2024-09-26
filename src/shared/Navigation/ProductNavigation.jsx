import { NavLink, useRouteLoaderData } from "react-router-dom";
import { motion } from 'framer-motion';



export default function ProductsNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <>
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
        <nav className="container mx-auto px-4 py-3">
          <ul className="flex items-center justify-center space-x-6">
            <NavItem to="" end>
              All Products
            </NavItem>
            {token && (
              <>
                <NavItem to="add" end>
                  Add Products
                </NavItem>
                <NavItem to=":id/edit" end>
                  Edit Products
                </NavItem>
              </>
            )}
          </ul>
        </nav>
      </header>
      );
};

      const NavItem = ({to, children, end}) => (
      <motion.li
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavLink
          to={to}
          className={({ isActive }) =>
            `px-4 py-2 rounded-full font-bold transition-all duration-300 ${isActive
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-white hover:bg-white/20'
            }`
          }
          end={end}
        >
          {({ isActive }) => (
            <>
              {children}
              {isActive && (
                <motion.span
                  className="absolute -bottom-2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </>
          )}
        </NavLink>
      </motion.li>
    </>
  );
}
