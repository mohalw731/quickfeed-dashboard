import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t mt-24">
      <section className="max-w-5xl mx-auto p-5">
        <div className=" flex items-center justify-between">
          <p className="text-xs text-gray-500">© 2024. All rights reserved.</p>
          <p className="text-xs cursor-pointer text-gray-500">
            terms of service
          </p>
          <p className="text-xs text-gray-500 cursor-pointer">privacy</p>
        </div>
      </section>
    </footer>
  );
}
