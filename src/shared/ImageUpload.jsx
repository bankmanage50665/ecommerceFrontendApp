import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaImage } from "react-icons/fa";

export default function ImageUpload({ onChangeImages , }) {
  const [previewUrl, setPreviewUrl] = useState();
  const imgRef = useRef();

  function handleOnChange(e) {
    const files = Array.from(e.target.files);
    const previewUrl = files.map((file) => URL.createObjectURL(file));
    setPreviewUrl(previewUrl);
    onChangeImages(files);
    
  }

  

  return (
    <>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <label
            htmlFor="image"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition duration-300 ease-in-out">
            <div className="space-y-1 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
              </motion.div>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="image"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload images</span>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    ref={imgRef}
                    multiple
                    onChange={handleOnChange}
                    className="sr-only"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </motion.div>

        {previewUrl && previewUrl.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {previewUrl.map((url, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <FaImage className="text-white text-3xl" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
