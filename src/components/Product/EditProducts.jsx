import { useState } from "react";

import {
  Form,
  json,
  useLoaderData,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";

export default function EditProducts() {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const product = useLoaderData();
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();
  const findProduct = product.findProduct;
  const sp = useParams().id;

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      setIsSubmiting(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/${sp}`,
        {
          method: "PATCH",
          body: JSON.stringify(userData),

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (err) {
      setIsSubmiting(false);
      throw json(
        { message: "Field to update product, Please try again later." },
        { status: 404 }
      );
    }

    navigate("/products");
    setIsSubmiting(false);
  };

  async function handleDeleteProduct() {
    try {
      setIsDeleting(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/${sp}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = await response.json();
    } catch (err) {
      setIsDeleting(false);
      throw json(
        { message: "Field to update product, Please try again later." },
        { status: 404 }
      );
    }

    navigate("/products");
    setIsDeleting(false);
  }

  return (
    <>
      <Form
        onSubmit={submitForm}
        className="p-8 bg-white w-80 h-auto mt-6 m-auto rounded-lg shadow-2xl md:w-1/2 md:m-auto"
      >
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-semibold text-gray-800"
          >
            Name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            className="block w-full rounded-md p-2 mb-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={findProduct ? findProduct.name : null}
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-lg font-semibold text-gray-800"
          >
            Description
          </label>
          <input
            name="description"
            type="text"
            id="description"
            className="block w-full rounded-md p-2 mb-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={findProduct ? findProduct.description : null}
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-lg font-semibold text-gray-800"
          >
            Price
          </label>
          <input
            name="price"
            type="text"
            id="price"
            className="block w-full rounded-md p-2 mb-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={findProduct ? findProduct.price : null}
          />
        </div>

        {/* Brand Field */}
        <div>
          <label
            htmlFor="brand"
            className="block mb-2 text-lg font-semibold text-gray-800"
          >
            Brand
          </label>
          <input
            name="brand"
            type="text"
            id="brand"
            className="block w-full rounded-md p-2 mb-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={findProduct ? findProduct.brand : null}
          />
        </div>

        {/* Category Field */}
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-lg font-semibold text-gray-800"
          >
            Category
          </label>
          <input
            name="category"
            type="text"
            id="category"
            className="block w-full rounded-md p-2 mb-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={findProduct ? findProduct.category : null}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            disabled={isSubmiting}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300 ease-in-out font-semibold"
          >
            {isSubmiting ? "Updating..." : "Update"}
          </button>
        </div>
      </Form>

      {/* Delete Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleDeleteProduct}
          disabled={isDeleting}
          className="px-6 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-300 ease-in-out font-semibold"
        >
          {isDeleting ? "Deleteing..." : "Delete"}
        </button>
      </div>
    </>
  );
}
