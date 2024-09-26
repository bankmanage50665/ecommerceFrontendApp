import React from "react"

export default function InputField({ icon, name, label, ...props }) {

    return <>
        <div className="relative">
            <label htmlFor={name} className="text-gray-300 font-medium mb-2 block">{label}</label>
            <div className="relative">
                {React.cloneElement(icon, { className: "absolute top-3 left-3 text-gray-400" })}
                <input
                    id={name}
                    name={name}
                    className="w-full bg-gray-700 text-white rounded-lg py-2 px-10 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    {...props}
                />
            </div>
        </div>
    </>
}
