import { User, Phone } from 'lucide-react';



export default function UserOrderUserDetails({ name, phone }) {
    return <>
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center space-x-4">
                <User className="text-primary-600 h-6 w-6" />
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{name}</h3>
                    <p className="text-gray-600">{phone}</p>
                </div>
            </div>
        </div>
    </>
}