import React, { Suspense } from "react";
import Loading from "./loading";
import Navbar from "@/modules/layout/Navbar";
import Footer from "@/modules/layout/Footer";

export default function Userlayout({ children }: any) {
  return (
    <div className="h-screen px-5">
      <Suspense fallback={<Loading />}>
        <Navbar />
        {children}
      </Suspense>
    </div>
  );
}
