// import React from "react";
// window.React = React;

interface TaskProps {
  id: string;
  title: string;
  description: string;
  handleDetele: any;
}

export default function Task({
  title,
  description,
  handleDetele,
  id,
}: TaskProps) {
  return (
    <div>
      <li className="p-4 bg-white rounded-md shadow-sm flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <button
          className="py-1 px-3 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => handleDetele(id)}
        >
          Done
        </button>
      </li>
    </div>
  );
}
