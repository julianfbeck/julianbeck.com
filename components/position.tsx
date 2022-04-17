import React from "react";

export const Position: React.FC<{
  company: string;
  logo: JSX.Element;
  position: string;
  description: string;
  url: string;
  from: string;
  to?: string;
}> = ({ company, url, from, to, position, logo, description }) => {
  return (
    <tr
      className="shadow-md shadow-gray-600/60 bg-gray-800 hover:cursor-pointer hover:bg-gray-700 transform duration-150 border-b border-gray-900 last:border-0"
      onClick={() => window.open(url, "_blank")}
    >
      <td className="px-6 py-4 whitespace-no-wrap ">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10">{logo}</div>
          <div className="ml-4">
            <div className="text-sm leading-5 font-medium text-gray-100">
              {position}
            </div>
            <div className="text-sm leading-5 text-gray-300">{company}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap hidden lg:table-cell">
        <div className="text-sm leading-5 text-gray-200">{description}</div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-white text-sm">
        <span className="">{from}</span> -{" "}
        <span className={!to ? "font-bold" : ""}>{to || "Now"}</span>
      </td>
    </tr>
  );
};
