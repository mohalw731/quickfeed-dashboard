import React from "react";
import Image from "next/image";

type ColumnDataProps = {
  title: string
  description: string
  btnText: string
  imageUrl: string
};

const columnData: ColumnDataProps[] = [
  {
    title: "AI Driven Solutions",
    description: "Empower your decisions. Reveal trends and opportunities at a glance, visualised in a way that makes sense for everyone.",
    btnText: "Start now",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s"
  },
  {
    title: "AI Driven Solutions",
    description: "Empower your decisions. Reveal trends and opportunities at a glance, visualised in a way that makes sense for everyone.",
    btnText: "Start now",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s"
  },
  {
    title: "AI Driven Solutions",
    description: "Empower your decisions. Reveal trends and opportunities at a glance, visualised in a way that makes sense for everyone.",
    btnText: "Start now",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s"
  },
  {
    title: "AI Driven Solutions",
    description: "Empower your decisions. Reveal trends and opportunities at a glance, visualised in a way that makes sense for everyone.",
    btnText: "Start now",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s"
  },
];

export default function ColumnRow() {
  return (
    <main className="flex md:my-20 my-12">
      <ul className="gap-6 flex flex-col">
        {columnData.map((column, index) => (
          <div key={index}>
            <li className={`flex md:gap-20 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col gap-6 items-center border border-[#202020] bg-[#171717] p-9 rounded-3xl z-[999]`}>
              <Image
                src={column.imageUrl}
                alt="Column Row"
                className="rounded-3xl"
                width={500}
                height={500}
              />
              <div className="flex flex-col gap-4">
                <FeatureBadge />
                <h2 className="md:text-4xl text-2xl text-white">{column.title}</h2>
                <p className=" md:text-lg text-sm text-white">{column.description}</p>
              </div>
            </li>
          </div>
        ))}
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

