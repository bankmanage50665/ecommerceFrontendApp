import {
  json,
  Link,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import CartContaxt from "../../context/CartContext";
import { useContext, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { FaShoppingCart, FaEdit, FaEye } from "react-icons/fa";

import { userId } from "../../middleware/getToken";
import { trackPageView } from "../../utils/FacebookPixel";

export default function Products() {
  const { addToCart } = useContext(CartContaxt);
  const products = useLoaderData();
  const userid = userId();
  const token = useRouteLoaderData("root");

  useEffect(() => {
    trackPageView();
  }, []);

  function handleAddToCart(product) {
    addToCart(product);
  }

  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <motion.div
        className="  min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.ul
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
        >
          {products &&
            products.allProduct.map((product) => (
              <motion.li
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:shadow-luxury-gold/30"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <div className="w-full max-w-4xl mx-auto">
                  <Carousel
                    autoplay
                    infiniteLoop
                    showStatus={false}
                    showThumbs={false}
                    showArrows={true}
                    className="w-full"
                  >
                    {product.image.map((img, index) => (
                      <div
                        key={index}
                        className="aspect-w-16 aspect-h-9 bg-gray-100"
                      >
                        <div className="w-full h-full max-w-[800px] max-h-[450px] mx-auto overflow-hidden">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                            className="object-contain w-full h-full"
                            alt={`${product.name} - Image ${index + 1}`}
                          />
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>

                <div className="p-6 space-y-4  bg-luxury-light-background">
                  <h2 className="text-2xl font-bold text-gray-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-luxury-gold">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center px-4 py-3 bg-luxury-gold text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors duration-300 font-semibold shadow-md"
                    >
                      <FaShoppingCart size={20} className="mr-2" />
                      Add to Cart
                    </motion.button>
                    <div></div>

                    <Link
                      to={`${product._id}`}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 font-semibold shadow-md"
                    >
                      <FaEye className="mr-2" /> View Details
                    </Link>

                    {product.creator === userid && token && (
                      <Link
                        to={`${product._id}/edit`}
                        className="w-full flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-300 font-semibold shadow-md"
                      >
                        <FaEdit className="mr-2" /> Edit Product
                      </Link>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
        </motion.ul>
      </motion.div>
    </>
  );
}

export async function loader() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/products/getAllProducts`
    );
    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message);
    }
    const products = resData.allProduct;

    const creatorId =
      products && products.length > 0 ? products[0].creator : null;

    if (creatorId) {
      localStorage.setItem("creatorid", creatorId);
    } else {
      console.log("No products found or no creator ID available.");
    }
    return resData;
  } catch (err) {
    throw json(
      { message: "Field to fetch products list please try again later." },
      { status: 500 }
    );
  }
}
