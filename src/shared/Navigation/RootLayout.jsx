import React from "react";
import { Outlet } from "react-router-dom";

import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <>
      <div className=" from-luxury-gold-gredient-from via-luxury-gold-gredient-via to-luxury-gold-gredient-to">
        <MainNavigation />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
