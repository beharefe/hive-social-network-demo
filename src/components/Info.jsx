import React from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import { useBlockInfo } from "../hooks/data";

const Info = () => {
  const { data } = useBlockInfo();

  if (!data)
    return (
      <span className="flex">
        Subscribing to Blockchain Info{" "}
        <RefreshIcon className="h-5 w-5 ml-2 animate-spin" />
      </span>
    );

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl mb-4">Blockchain Info</h2>
      {Object.keys(data).map((key) => {
        return (
          <label
            key={key}
            className="flex flex-col mb-4 font-semibold text-gray-500"
          >
            {key.toUpperCase()}
            <span className="font-normal text-gray-800 dark:text-white">
              {data[key]}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default Info;
