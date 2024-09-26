import { json, useLoaderData } from "react-router-dom";

export default function PlaceOrder() {
  const data = useLoaderData();
  const { orders } = data;

  return (
    <>
      (
      <ul className="list-none p-0">
        {orders.map((order) => (
          <li key={order.id} className="border-b border-gray-200 p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Order #{order.id}
            </h2>
            <ul className="list-none p-0">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center py-2">
                  <div className="mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      )
    </>
  );
}

export async function loader({ req, params }) {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/get`);
    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.message);
    }
    return resData;
  } catch (err) {
    throw json(
      { message: "Field to load user orders, Please try again later." },
      { status: 500 }
    );
  }
}
