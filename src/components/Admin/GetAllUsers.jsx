import { json, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

import RenderAllUsers from "./RenderAllUsers";

export default function GetAllUsers() {
  const data = useLoaderData();
  const users = data && data.users;

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-lg rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {users.map((user, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <RenderAllUsers user={user} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export async function loader() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/allUsers`
    );
    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message);
    }

    return resData;
  } catch (err) {
    throw json(
      { message: "Field to get user list, Plese try again later." },
      { status: 500 }
    );
  }
}
