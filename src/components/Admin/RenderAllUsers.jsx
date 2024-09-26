import { Link } from "react-router-dom";
import { User, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RenderAllUsers({ user }) {



    return <>


        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-purple-100 to-indigo-100 shadow-lg rounded-xl p-6 space-y-4 max-w-2xl mx-auto"
        >
            <motion.div
                className="flex items-center space-x-4"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            >
                <div className="bg-indigo-600 rounded-full p-3 shadow-md">
                    <User className="text-white h-8 w-8" />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 truncate">{user.name}</h3>
                    <p className="text-indigo-600 font-medium text-sm truncate">{user.email}</p>
                </div>
            </motion.div>

            <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Orders</h4>
                <ul className="space-y-2">
                    {user.orders.map((order, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="bg-indigo-100 rounded-full p-2">
                                <Package className="text-indigo-600 h-5 w-5" />
                            </div>
                            <Link
                                to={order}
                                className="text-indigo-700 hover:text-indigo-900 font-medium transition-colors duration-300"
                            >
                                Order details {order.id}
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>

    </>
}