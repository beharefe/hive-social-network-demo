import { Link, useParams } from "react-router-dom";
import marked from "marked";
import { useGetCommunities, useGetPost } from "../hooks/data";
import Button from "../components/Button";

const Post = () => {
  const { author, permlink } = useParams();
  const { post, loading } = useGetPost({ author, permlink });
  const { communities } = useGetCommunities();

  if (loading) return <span className="text-green-400">Loading...</span>;

  const { category, body, title, author: postAuthor } = post;

  const filteredCommunities = communities ? communities.filter(({ key }) => key !== category) : [];

  return (
    <div className=" py-2 rounded-lg grid grid-cols-3">
      <ul className="flex flex-col px-2">
        <h2 className="text-2xl text-center mb-6">Check Other Communities</h2>
        {filteredCommunities.map(({ key, title }) => {
          return (
            <Button>
              <Link to={`/trending-communities/${key}`}>{title}</Link>
            </Button>
          );
        })}
      </ul>

      <div className="prose dark:bg-gray-50 col-span-2 py-4 rounded-lg">
        <h3>Author: {postAuthor}</h3>
        <h1>{title}</h1>
        <br />
        <article
          className="prose mx-auto"
          dangerouslySetInnerHTML={{ __html: marked(body || "") }}
        ></article>
      </div>
    </div>
  );
};

export default Post;
