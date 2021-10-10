import React from "react";
import ReactDOM from "react-dom";
import { XIcon } from "@heroicons/react/solid";
import { useAlert } from "../hooks/alert";

const Alert = ({ id, title, message, onClose }) => {
  return (
    <div
      className={`bg-gray-800
      dark:bg-white
      dark:text-gray-900
      text-gray-50
      flex
      flex-col
      p-4
      w-80
      rounded-lg
      my-2 shadow-lg`}
    >
      <div className="flex justify-between mb-4">
        <h4 className="text-yellow-300 dark:text-yellow-600">{title}</h4>
        <button onClick={() => onClose(id)}>
          <XIcon className="h-6 w-6 text-white dark:text-gray-900" />
        </button>
      </div>
      {message}
    </div>
  );
};

const AlertOutlet = () => {
  const { alerts, removeAlert } = useAlert();

  return ReactDOM.createPortal(
    alerts.map(({ id, ...rest }) => (
      <Alert key={id} id={id} onClose={removeAlert} {...rest} />
    )),
    document.getElementById("alert-container")
  );
};

export default AlertOutlet;
