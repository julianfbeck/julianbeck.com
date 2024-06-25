import React from "react";
import { motion } from "framer-motion";
const tagClass =
  "text-[10px] inline-flex items-center font-bold leading-sm px-1.5 text-black/70 dark:text-black rounded-lg";
export const Project: React.FC<{
  name: string;
  logo: string;
  description: string;
  url: string;
  tags: string[];
}> = ({ name, url, logo, description, tags }) => {
  return (
    <a href={url} target="_blank">
      <motion.div
        className="rounded-lg bg-black/20 cursor-pointer overflow-hidden group hover:shadow-lg shadow-lg  hover:sm:shadow-indigo-500/20 transition duration-500 border-2 border-slate-800"
        variants={{
          hidden: { filter: "grayscale(80%)" },
          visible: {
            transition: { duration: 0.4, easings: "circOut" },
            opacity: 1,
            filter: "grayscale(0%)",
            scale: 1,
          },
        }}
      >
        <div className="h-32 w-full flex justify-evenly items-center transition-all duration-200 transform">
          <h2 className="text-center text-4xl md:text-5xl font-bold leading-tighter tracking-tighter font-heading text-blue-100">
            {name}
          </h2>
          <img
            className="w-20 transition-transform rounded-2xl duration-500 transform group-hover:scale-150"
            src={logo}
            alt={name}
          />
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
          {tags.map((tag) => (
            <span className={`${tagClass} bg-sky-200 m-1`}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </a>
  );
};
