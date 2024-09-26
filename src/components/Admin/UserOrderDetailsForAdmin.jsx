import { json, useLoaderData } from "react-router-dom";

import RenderUserOrderDetails from "./RenderUserOrderDetails";

export default function UserOrderDetailsForAdmin() {
  const data = useLoaderData();
  const order = data && data.order;

  return (
    <>
      <div>
        <RenderUserOrderDetails order={order} />
      </div>
    </>
  );
}

export async function loader({ req, params }) {
  const orderId = params.id;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/${orderId}`
    );
    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message);
    }

    return resData;
  } catch (err) {
    throw json(
      { message: "Field to fetch user order details, Please try again later." },
      { status: 500 }
    );
  }
}
