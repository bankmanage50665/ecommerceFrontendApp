import {
  Form,
  json,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaProductHunt,
  FaDollarSign,
  FaTag,
  FaThList,
  FaUpload,
} from "react-icons/fa";

import ImageUpload from "../../shared/ImageUpload";
import { userId } from "../../middleware/getToken";

export default function AddProducts() {
  const [files, setFiles] = useState([]);
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const navigate = useNavigate();
  const token = useRouteLoaderData("root");
  const userid = userId();

  function handleGetImg(img) {
    setFiles(img);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const productData = e.target.elements;

    try {
      const formData = new FormData();
      formData.append("name", productData.name.value);
      formData.append("description", productData.description.value);
      formData.append("price", productData.price.value);
      formData.append("brand", productData.brand.value);
      formData.append("category", productData.category.value);
      formData.append("creator", userid);
      files.forEach((files) => formData.append("image", files));

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/add`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await res.json();
      console.log(resData);

      if (!res.ok) {
        throw new Error(resData.message);
      }
    } catch (err) {
      throw json(
        { message: "Field to add new product, Please try again later." },
        { status: 500 }
      );
    }

    navigate("/products");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full mx-auto mt-10 bg-gradient-to-br from-purple-50 to-indigo-100 p-8 rounded-lg shadow-2xl"
      >
        <Form onSubmit={submitForm} className="space-y-6">
          {/* Product Name */}
          <div className="relative">
            <label
              htmlFor="name"
              className="block mb-2 text-lg font-semibold text-gray-800"
            >
              <FaProductHunt className="inline mr-2 text-indigo-500" />
              Product Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              required
              className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="relative">
            <label
              htmlFor="description"
              className="block mb-2 text-lg font-semibold text-gray-800"
            >
              <FaTag className="inline mr-2 text-indigo-500" />
              Description
            </label>
            <textarea
              name="description"
              type="text"
              id="description"
              required
              className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Price */}
          <div className="relative">
            <label
              htmlFor="price"
              className="block mb-2 text-lg font-semibold text-gray-800"
            >
              <FaDollarSign className="inline mr-2 text-indigo-500" />
              Price
            </label>
            <input
              name="price"
              type="number"
              id="price"
              required
              className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Brand */}
          <div className="relative">
            <label
              htmlFor="brand"
              className="block mb-2 text-lg font-semibold text-gray-800"
            >
              <FaThList className="inline mr-2 text-indigo-500" />
              Brand
            </label>
            <input
              name="brand"
              type="text"
              id="brand"
              required
              className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <label
              htmlFor="category"
              className="block mb-2 text-lg font-semibold text-gray-800"
            >
              <FaThList className="inline mr-2 text-indigo-500" />
              Category
            </label>
            <input
              name="category"
              type="text"
              id="category"
              required
              className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Image Upload */}
          <div className="relative">
            <label
              htmlFor="imageUpload"
              className="block mb-2 text-lg font-semibold text-gray-800"
            >
              <FaUpload className="inline mr-2 text-indigo-500" />
              Upload Images
            </label>
            <ImageUpload onChangeImages={handleGetImg} />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmiting}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                isSubmiting
                  ? "bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmiting ? "Submitting..." : "Submit"}
            </motion.button>
          </div>
        </Form>
      </motion.div>
    </>
  );
}
