


export default function UserOrderDetails({ orderStatus, paymentStatus, totalPrice, totalQuantity, deliveredWillBe }) {



    return <>
        <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order Status:</span>
                    <span className="font-medium text-blue-600">{orderStatus}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className="font-medium text-green-600">{paymentStatus}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="font-bold text-red-600">{totalPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Quantity:</span>
                    <span className="font-medium">{totalQuantity}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivered will be:</span>
                    <span className="font-medium text-purple-600">{deliveredWillBe}</span>
                </div>
            </div>
        </div>
    </>
}