import React, { Suspense } from "react";
import Loading from "./loading";

export default function Userlayout({ children }: any) {
  return <div>
    <Suspense fallback={<Loading/>}>
    {children}
    </Suspense>
  </div>;
}
