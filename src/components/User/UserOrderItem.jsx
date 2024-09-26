import React from "react";

export default function UserOrderItem({ itemname, quantity, img, price }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 bg-white shadow-md rounded-md">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
          alt={itemname}
          className="w-40 h-40 object-cover rounded-md"
        />
      </div>
    </>
  );
}
