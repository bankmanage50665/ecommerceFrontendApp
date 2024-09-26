import { Outlet } from "react-router-dom";
import ProductsNavigation from "./ProductNavigation";

export default function ProductLayout() {
  return (
    <>
      <ProductsNavigation />
      <Outlet />
    </>
  );
}
