import { forwardRef } from "react";
import classNames from "classnames";

const Button = forwardRef(({ active, children, onClick, ...rest }, ref) => (
  <button
    ref={ref}
    className={classNames(
      `hover:bg-gray-800
      hover:text-gray-200
      dark:hover:bg-gray-200
      dark:hover:text-gray-800
      p-2
      rounded-lg
      font-semibold
      text-lg`,
      {
        "dark:bg-gray-100": active,
        "dark:text-gray-700": active,
        "bg-gray-700": active,
        "text-gray-100": active,
      }
    )}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
));

export default Button;
