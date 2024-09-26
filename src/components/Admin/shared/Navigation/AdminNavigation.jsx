import React from 'react';
import { Link } from 'react-router-dom';


export default function AdminNavigation() {
    return <>
        <div className="mt-8">
            <ul className="bg-white shadow-md rounded-lg p-4 space-y-2 flex items-center justify-evenly">
                <li>
                    <Link to="add" className="block text-gray-900 hover:text-primary-600 font-medium">
                        Add products
                    </Link>
                </li>
                <li>
                    <Link to="" className="block text-gray-900 hover:text-primary-600 font-medium">
                        Edit products
                    </Link>
                </li>
                <li>
                    <Link to="" className="block text-gray-900 hover:text-primary-600 font-medium">
                        All   Users
                    </Link>
                </li>
            </ul>

        </div>
    </>
}