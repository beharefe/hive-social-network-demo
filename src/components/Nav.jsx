import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { SunIcon, MoonIcon, RefreshIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { useAlert } from "../hooks/alert";
import { useTheme } from "../hooks/theme";
import { useGetCommunities } from "../hooks/data";
import Button from "./Button";
import Dropdown from "./Dropdown";

const Nav = () => {
  const history = useHistory();
  const { colorMode, setColorMode } = useTheme();
  const { showAlert } = useAlert();

  const { communities, loading, error } = useGetCommunities();

  useEffect(() => {
    if (error) {
      showAlert("Error when getting communities!", error.message);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <nav className="flex justify-between items-center my-8">
      <div className="flex">
        {/* Brand */}
        <span
          className="text-3xl font-semibold mr-4 text-red-500 cursor-pointer"
          onClick={() => history.push("/")}
        >
          Hive Social Network
        </span>
        
        {/* Menu Items */}
        <Dropdown
          label={
            <span
              className={classNames("flex items-center", {
                "opacity-60": loading,
                "pointer-events-none": loading,
                "cursor-wait": loading
              })}
            >
              Trending Communities
              {loading && <RefreshIcon className="h-5 w-5 ml-2 animate-spin" />}
            </span>
          }
          items={communities.map(({ key, title }) => ({
            label: title,
            link: `/trending-communities/${key}`,
          }))}
        />

        <Button>
          <Link to="/proposals">Proposals</Link>
        </Button>
      </div>

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
