import React from "react";
import { Link } from "react-router-dom";
import { useGetCommunities } from "../hooks/data";

const Home = () => {
  const { communities, loading } = useGetCommunities();

  return (
    <div className="prose dark:text-white">
      <h2 className="dark:text-gray-50">Welcome to Hive Social Network Platform!</h2>
      <h3 className="dark:text-gray-200">Select a community to explore awesome contents 🥳</h3>

      {loading ? (
        <div>Loading Top 10 Communities...</div>
      ) : (
        <ul className="flex flex-col">
          {communities.map(({ key, title }) => {
            return (
              <Link
                className="text-lg dark:text-gray-300"
                key={key}
                to={`/trending-communities/${key}`}
              >
                {title}
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Home;
