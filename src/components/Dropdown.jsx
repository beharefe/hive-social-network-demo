import { createRef, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useOnClickOutside } from "../hooks/utility";
import Button from "./Button";

const Dropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const btnRef = createRef();

  useOnClickOutside(
    menuRef,
    () => {
      setOpen(false);
    },
    [btnRef]
  );

  return (
    <div className="mx-2 relative">
      <Button ref={btnRef} active={open} onClick={() => setOpen(!open)}>
        {label}
      </Button>

      {open && (
        <ul
          ref={menuRef}
          className="absolute top-12 left-0 right-0 bg-gray-700 text-gray-100 dark:text-gray-800 dark:bg-white rounded-lg"
        >
          {items.map(({ label, link }) => (
            <li className="p-2 font-semibold hover:opacity-75" key={label} onClick={() => setOpen(false)}>
              <Link to={link}>{label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
