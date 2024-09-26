import { motion } from 'framer-motion';

export default function OrderDetails({ orderedItems }) {


    return <>
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {orderedItems.map((item, index) => (
                <motion.div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg rounded-lg p-6"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-700">Quantity: <span className="font-medium">{item.quantity}</span></p>
                        <p className="text-gray-700">Brand: <span className="font-medium">{item.brand}</span></p>
                    </div>
                </motion.div>
            ))}
        </motion.div>



    </>
}