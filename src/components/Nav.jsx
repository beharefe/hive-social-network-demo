import { SunIcon, MoonIcon } from "@heroicons/react/outline";
import { useAlert } from "../hooks/alert";
import { useTheme } from "../hooks/theme";

const Nav = () => {
  const { colorMode, setColorMode } = useTheme();
  const { showAlert } = useAlert();

  return (
    <nav className="flex justify-between items-center">
      <span className="text-2xl font-semibold">Hive Social Network</span>

      <button
        onClick={() => {
          if (colorMode === "dark") {
            setColorMode("light");
            showAlert("Theme changed", `Just shine like a diamond ☀️`);
          } else {
            setColorMode("dark");
            showAlert("Theme changed", `You can't escape from the darkness 🌚`);
          }
        }}
      >
        {colorMode === "dark" && (
          <SunIcon className="h-10 w-10 text-yellow-300" />
        )}
        {colorMode === "light" && (
          <MoonIcon className="h-10 w-10 text-indigo-900" />
        )}
      </button>
    </nav>
  );
};

export default Nav;
