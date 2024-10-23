import React from "react";
import Image from "next/image";
import feedbackImage from "../../assets/analzys.png";

export default function ColumnRow() {
  return (
    <main className="md:my-20 my-12">
      <ul>
        <li className="flex md:gap-20 md:flex-row flex-col gap-6 items-center border border-[#202020] bg-[#171717] p-9 rounded-3xl z-[999]">
          <Image 
            src={feedbackImage}
            alt="Column Row"
            className="rounded-3xl"
            width={500}
            height={500}
            />
          <div className="flex flex-col gap-4">
              <FeatureBadge />
              <h2 className="md:text-4xl text-2xl text-white">Connect all your data </h2>
              <p className=" md:text-lg text-sm text-white">Whether your data is all in one place or spread across various platforms, Inblick brings it all together. By connecting seamlessly with your data sources, Inblick provides a comprehensive overview.</p>
          </div>
        </li>
      </ul>
    </main>
  );
}

const FeatureBadge = () => {
  return (
    <div className="text-lg border border-[#303030] p-2 rounded-full text-white max-w-[100px] flex items-center justify-center">
      Feature
    </div>
  );
};
