import React from "react";
import Image from "next/image";

const Contact = ({ src, name }) => {
  return (
    <div className="flex items-center mb-1 space-x-2 cursor-pointer p-2 relative hover:bg-gray-200 rounded-xl">
      <Image
        className="rounded-full"
        src={src}
        width={40}
        height={40}
        layout="fixed"
        objectFit="cover"
      />

      <p>{name}</p>

      <div className="absolute bottom-2 left-7 h-3 w-3 bg-green-500 rounded-full animate-bounce " />
    </div>
  );
};

export default Contact;
