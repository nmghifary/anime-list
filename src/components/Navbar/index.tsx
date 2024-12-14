"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  return (
    <SessionProvider>
      <Navbar />
    </SessionProvider>
  );
};

export default NavbarWrapper;
