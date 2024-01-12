import React from "react";
import { motion, type MotionStyle } from "framer-motion";

export const Project: React.FC<{
  name: string;
  logo: JSX.Element;
  color: string;
  description: string;
  style: MotionStyle;
  url: string;
  tags: JSX.Element;
}> = ({ name, url, logo, color, description, style, tags }) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      variants={{
        hidden: { filter: "grayscale(80%)" },
        visible: {
          transition: { duration: 0.4, easings: "circOut" },
          opacity: 1,
          filter: "grayscale(0%)",
          scale: 1,
        },
      }}
      className="rounded-lg shadow-md shadow-gray-600/60 bg-gray-800 cursor-pointer overflow-hidden transition-all duration-200 group hover:shadow-lg"
    >
      <div
        className="h-32 w-full flex justify-center items-center transition-all duration-200 transform"
        style={{ backgroundColor: color }}
      >
        {logo}
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <img
            className="ml-auto opacity-0 transform duration-200 group-hover:opacity-100 h-3"
            src="./arrow-right.svg"
          />
        </div>

        <div className="mt-3 text-sm text-white">{description}</div>
        {tags}
      </div>
    </motion.a>
  );
};