import React, { useState } from "react";
import Image from "next/image";
const SelectStyle = ({ onUserSelect }) => {
  const STYLES = [
    {
      name: "Realistic",
      image: "/realistic.png",
    },
    {
      name: "Cartoon",
      image: "/cartoon.png",
    },
    {
      name: "Comic",
      image: "/comic.png",
    },
    {
      name: "Watercolor",
      image: "/watercolor.png",
    },
    {
      name: "GTA",
      image: "/gta.png",
    },
  ];
  const [selectedStyle, setSelectedStyle] = useState(null);

  return (
    <div className="mt-8">
      <h2 className="font-bold text-xl text-primary">Style</h2>
      <p className="text-gray-500 mt-1">Select your video style</p>

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {STYLES.map((style, index) => (
          <div
            key={index}
            className={`rounded-lg border border-gray-200 w-[85%] relative cursor-pointer  hover:scale-105 transition-transform duration-300 ${
              selectedStyle === style.name && "border-2 border-primary"
            }`}
          >
            <Image
              src={style.image}
              alt={style.name}
              width={1024}
              height={1024}
              className="object-cover rounded-lg h-64 w-full"
              onClick={() => {
                setSelectedStyle(style.name);
                onUserSelect("imageStyle", style.name);
              }}
            />
            <h2 className="absolute p-1 bg-black bottom-0 text-white w-full rounded-b-lg text-center ">
              {style.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
