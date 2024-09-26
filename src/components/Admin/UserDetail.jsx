import { User, MapPin, Hash, Building2, Phone } from 'lucide-react';
import { motion } from "framer-motion"; // Import Framer Motion



export default function UserDetails({ user }) {



    return <>
        <motion.div
            className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 shadow-lg rounded-xl p-8 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* User Info */}
            <motion.div
                className="flex items-center space-x-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <User className="text-indigo-600 h-10 w-10" />
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                    <p className="text-gray-700">{user.email}</p>
                </div>
            </motion.div>

            {/* Phone */}
            <motion.div
                className="flex items-center space-x-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <Phone className="text-blue-500 h-6 w-6" />
                <p className="text-gray-700">{user.phone}</p>
            </motion.div>

            {/* Address */}
            <motion.div
                className="flex items-center space-x-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <MapPin className="text-red-500 h-6 w-6" />
                <p className="text-gray-700">{user.address}</p>
            </motion.div>

            {/* PIN */}
            <motion.div
                className="flex items-center space-x-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <Hash className="text-yellow-500 h-6 w-6" />
                <p className="text-gray-700">{user.pin}</p>
            </motion.div>

            {/* City */}
            <motion.div
                className="flex items-center space-x-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <Building2 className="text-green-500 h-6 w-6" />
                <p className="text-gray-700">{user.city}</p>
            </motion.div>
        </motion.div>

    </>
}