import React, { Suspense } from "react";
import Loading from "./loading";
import Navbar from "@/components/layout/navbar/Navbar";

export default function Userlayout({ children }: any) {
  return (
    <div className="px-5  ">
      <Suspense fallback={<Loading />}>
        <Navbar />
        {children}
      </Suspense>
    </div>
  );
}
