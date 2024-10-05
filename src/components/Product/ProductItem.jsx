import React, { useContext, useState } from "react";
import { json, useLoaderData } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { MdCurrencyRupee } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductReviews from "./AddProductReview";

import CartContext from "../../context/CartContext";
import GetProductReview from "./GetProductReview";

export default function ProductDetail() {
  const { addToCart } = useContext(CartContext);
  const product = useLoaderData();
  const findProduct = product && product.findProduct;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishListed, setIsWishListed] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === findProduct.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? findProduct.image.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row lg:space-x-12"
          >
            {/* Main Image and Thumbnails */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <motion.div
                className="relative aspect-w-3 aspect-h-4 rounded-lg overflow-hidden shadow-2xl mb-4"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  key={currentImageIndex}
                  src={`${process.env.REACT_APP_BACKEND_URL}/${findProduct.image[currentImageIndex]}`}
                  alt={`${findProduct.name} - Image ${currentImageIndex + 1}`}
                  className="object-cover w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  ›
                </button>
              </motion.div>

              {/* Thumbnails */}
              <motion.div
                className="flex space-x-2 overflow-x-auto pb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {findProduct.image.map((img, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer flex-shrink-0"
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                      className="w-20 h-20 object-cover rounded-lg shadow-md"
                      alt={`${findProduct.name} - Thumbnail ${index + 1}`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Product Details */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gray-800 bg-opacity-60 rounded-lg shadow-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-4xl font-bold text-white">
                    {findProduct.name}
                  </h1>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsWishListed(!isWishListed)}
                  >
                    {isWishListed ? (
                      <FaHeart className="text-3xl text-red-500" />
                    ) : (
                      <FaRegHeart className="text-3xl text-gray-400" />
                    )}
                  </motion.button>
                </div>

                <div className="flex items-center mb-6">
                  <MdCurrencyRupee className="text-5xl text-luxury-gold mr-1" />
                  <span className="text-4xl font-bold text-white">
                    {findProduct.price}
                  </span>
                </div>

                <p className="text-gray-300 text-lg mb-4">
                  Brand: {findProduct.brand}
                </p>
                <p className="text-white text-xl mb-6">
                  {findProduct.description}
                </p>
                <p className="text-gray-300 text-lg mb-6">
                  Category: {findProduct.category}
                </p>

                <div className="flex items-center mb-8">
                  <GrDeliver className="text-3xl text-luxury-gold mr-3" />
                  <p className="text-white text-lg">Free Delivery</p>
                </div>

                <motion.button
                  onClick={() => addToCart(findProduct)}
                  className="w-full bg-luxury-gold hover:bg-luxury-gold-hover text-black text-xl font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Large Image Gallery */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Product Gallery
            </h2>
            <div className="grid grid-cols-1 md:max-w-lg lg:max-w-3xl mx-auto gap-4">
              {findProduct.image.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden shadow-xl"
                >
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                    className="object-cover w-full h-full"
                    alt={`${findProduct.name} - Gallery Image ${index + 1}`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div>
        <ProductReviews productId={findProduct._id} />
      </div>
    </>
  );
}

export async function loader({ req, params }) {
  const proudId = params.id;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/products/${proudId}`
    );
    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message);
    }

    return resData;
  } catch (err) {
    throw json(
      {
        message:
          "Field to fetching product item, Please try again later after some time.",
      },
      { status: 500 }
    );
  }
}
