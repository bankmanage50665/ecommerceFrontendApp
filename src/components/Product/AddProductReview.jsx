// ProductReviews.js
import React, { useState, useEffect } from "react";
import { FaStar, FaUpload, FaUser, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { json, useNavigate, useRouteLoaderData } from "react-router-dom";
import { PulseLoader } from "react-spinners";

import ImageUpload from "../../shared/ImageUpload";

const ProductReviews = ({ productId }) => {
  const [files, setFiles] = useState([]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [productReview, setProductReview] = useState([]);
  const token = useRouteLoaderData("root");
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 5,
    comment: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/review/${productId}`
        );
        const resData = await res.json();
      

        setProductReview(resData.review);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId, isSubmiting]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  function handleGetImg(img) {
    setFiles(img);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return navigate("/login");
    }

    setIsSubmiting(true);
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("userName", newReview.userName);
    formData.append("rating", newReview.rating);
    formData.append("comment", newReview.comment);
    if (files) {
      files.forEach((files) => formData.append("image", files));
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/review/create`,
        {
          method: "POST",

          body: formData,
        }
      );
      const resData = await res.json();

      setNewReview({ userName: "", rating: 5, comment: "", image: null });

      if (!res.ok) {
        throw new Error(resData.message);
      }
    } catch (err) {
      setIsSubmiting(false);
      throw json(
        { message: "Field to add product review, Please try again later." },
        { status: 500 }
      );
    }

    navigate(`/products/${productId}`);

    setIsSubmiting(false);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
        >
          Add Product Reviews
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <input
              type="text"
              name="userName"
              value={newReview.userName}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <select
              name="rating"
              value={newReview.rating}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num !== 1 && "s"}
                </option>
              ))}
            </select>
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((num) => (
                <FaStar
                  key={num}
                  className={`${
                    num <= newReview.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              placeholder="Your Review"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
            ></textarea>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <label
              htmlFor="imageUpload"
              className="block mb-2 text-lg font-semibold text-gray-800"
            >
              <FaUpload className="inline mr-2 text-indigo-500" />
              Upload Images
            </label>
            <ImageUpload onChangeImages={handleGetImg} />
          </motion.div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            {isSubmiting ? (
              <PulseLoader color="#ffffff" size={10} />
            ) : (
              "Add review "
            )}
          </motion.button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
        >
          Product Reviews
        </motion.h2>
        {productReview && productReview.length >= 1 && (
          <ul className="space-y-8">
            {productReview.map((review, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaUser className="text-gray-400 mr-3 text-xl" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      {review.userName}
                    </h3>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } w-5 h-5`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">
                      ({review.rating})
                    </span>
                  </div>
                  <div className="mb-4">
                    <FaQuoteLeft className="text-indigo-500 mb-2" />
                    <p className="text-gray-600 italic">{review.comment}</p>
                  </div>
                  {review.imageUrl.length >= 1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {review.imageUrl.map((img, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                            alt={`Review image ${imgIndex + 1}`}
                            className="w-full h-32 object-cover rounded-md shadow-md"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ProductReviews;
