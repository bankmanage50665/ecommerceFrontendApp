import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaUser, FaQuoteLeft } from "react-icons/fa";

export default function GetProductReview({ productId }) {
  const [productReview, setProductReview] = useState([]);

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
  }, [productId]);

  return (
    <>
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
}
