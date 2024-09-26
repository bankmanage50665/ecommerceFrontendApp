import { FaShippingFast, FaMoneyCheckAlt, FaCalendarCheck, FaTag, FaBox } from 'react-icons/fa';
import { motion } from 'framer-motion';



import UserDetails from "./UserDetail"
import OrderedItemDetails from "./OrderedItemDetails"
import UpdateOrderStatus from "./UpdateOrderStatus"

export default function RenderUserOrderDetails({ order }) {


    return <>
        <motion.div
            className="p-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-lg rounded-lg space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Order Info Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                    <p className="text-gray-700 flex items-center">
                        <FaShippingFast className="text-blue-500 mr-3" />
                        Order delivery status:
                        <span className="font-semibold text-indigo-600 ml-2">{order.orderStatus}</span>
                    </p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                    <p className="text-gray-700 flex items-center">
                        <FaMoneyCheckAlt className="text-green-500 mr-3" />
                        Order payment status:
                        <span className="font-semibold text-indigo-600 ml-2">{order.paymentStatus}</span>
                    </p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                    <p className="text-gray-700 flex items-center">
                        <FaCalendarCheck className="text-purple-500 mr-3" />
                        Order delivered will be:
                        <span className="font-semibold text-indigo-600 ml-2">{order.deliveredWillBe}</span>
                    </p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                    <p className="text-gray-700 flex items-center">
                        <FaTag className="text-yellow-500 mr-3" />
                        Total Price:
                        <span className="font-semibold text-indigo-600 ml-2">{order.totalPrice}</span>
                    </p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                    <p className="text-gray-700 flex items-center">
                        <FaBox className="text-red-500 mr-3" />
                        Total quantity:
                        <span className="font-semibold text-indigo-600 ml-2">{order.totalQuantity}</span>
                    </p>
                </div>
            </motion.div>

            {/* User Details */}
            <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <UserDetails user={order.user} />
            </motion.div>

            {/* Ordered Item Details */}
            <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <OrderedItemDetails orderedItems={order.items} />
            </motion.div>

            {/* Update Order Status */}
            <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <UpdateOrderStatus order={order} />
            </motion.div>
        </motion.div>

    </>
}