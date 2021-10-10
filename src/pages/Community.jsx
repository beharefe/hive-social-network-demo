import { useParams, Link } from "react-router-dom";
import { useGetCommunity, useGetCommunityPosts } from "../hooks/data";

const Community = () => {
  const { communityName } = useParams();
  const { community, loading, error } = useGetCommunity(communityName);

  const { posts, loading: postsLoading } = useGetCommunityPosts(communityName);

  if (loading) return <span>Loading community...</span>;

  if (error)
    return (
      <span>An error occured when loading community: {error.message}</span>
    );
  const { title, about, subscribers } = community;
  return (
    <div className="w-full">
      
      <h2 className="dark:text-gray-50 text-3xl">
        {title}{" "}
        <small className="font-light ml-2">
          <i>{subscribers} Subscribers</i>
        </small>
      </h2>
      <p className="dark:text-gray-200 my-2">{about}</p>

      <div className="flex flex-col">
        {postsLoading ? (
          <span className="text-green-400">
            Loading community Posts for {community.title}...
          </span>
        ) : (
          posts.map(({ post_id, title, permlink, author }) => (
            <div
              key={post_id}
              className="flex justify-between p-4 my-2 bg-white w-full rounded-lg dark:text-gray-800"
            >
              {title}
              <button>
                <Link to={`/trending-communities/posts/${author}/${permlink}`}>Read</Link>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;
