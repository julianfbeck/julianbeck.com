import React from "react";
import {
  motion,
  useTransform,
  type MotionStyle,
  useViewportScroll,
} from "framer-motion";

export const Project: React.FC<{
  name: string;
  logo: string;
  color: string;
  description: string;
  url: string;
  tags: string;
}> = ({ name, url, logo, color, description, tags }) => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  return (
    <a href={url} target="_blank">
      <motion.div
        className="rounded-lg bg-gray-800 cursor-pointer overflow-hidden group hover:shadow-lg shadow-lg shover:shadow-xl hover:sm:shadow-indigo-500/20 transition duration-500 border-2 border-slate-800"
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
        <div
          className="h-32 w-full flex justify-evenly items-center transition-all duration-200 transform"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-center text-4xl md:text-6xl font-bold leading-tighter tracking-tighter font-heading text-blue-100">
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
          {tags}
        </div>
      </motion.div>
    </a>
  );
};
