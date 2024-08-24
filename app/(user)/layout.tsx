import React from "react";

export default function Userlayout({ children }: any) {
  return <div className="container w-full max-w-screen-xl mx-auto py-10">
    {children}
  </div>;
}
