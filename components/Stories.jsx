import React from "react";
import { stories } from "../utils/data";
import Image from "next/image";

const Stories = () => {
  return (
    <div className="flex justify-center space-x-3 mx-auto overflow-x-scroll scrollbar-hide">
      {stories.map((story, i) => (
        <div
          key={i}
          className="relative h-10 w-10 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x p-3 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse"
        >
          <Image
            className="absolute top-10 z-50 opacity-0 lg:opacity-100 rounded-full"
            src={story.profile}
            width={40}
            height={40}
            layout="fixed"
            objectFit="cover"
          />

          <Image
            className="filter brightness-95 rounded-full lg:rounded-3xl"
            src={story.src}
            layout="fill"
            objectFit="cover"
          />

          <p className="absolute opacity-0 lg:opacity-100 bottom-4 w-5/6 text-white text-sm font-bold truncate">
            {story.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stories;
