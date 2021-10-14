import { Link, useParams } from "react-router-dom";
import marked from "marked";
import { useQuery } from "react-query";
import { useGetPost } from "../hooks/data";
import Button from "../components/Button";

const Post = () => {
  const { author, permlink } = useParams();
  const { post, loading } = useGetPost({ author, permlink });
  
  const { data: filteredCommunities, isIdle } = useQuery("communities", {
    initialData: [],
    enabled: !!post,
    // show other communities other than the current one
    select: (communities) =>
      communities.filter(({ key }) => key !== post.category),
  });

  const { body, title, author: postAuthor } = post;

  return (
    <div className=" py-2 rounded-lg grid grid-cols-3">
      <ul className="flex flex-col px-2">
        <h2 className="text-2xl text-center mb-6">Check Other Communities</h2>
        {isIdle ? (
          <span> Waiting for communnity data... </span>
        ) : (
          filteredCommunities.map(({ key, title }) => {
            return (
              <Button key={key}>
                <Link to={`/trending-communities/${key}`}>{title}</Link>
              </Button>
            );
          })
        )}
      </ul>

      {loading ? (
        <span className="text-green-400">Loading...</span>
      ) : (
        <div className="prose dark:bg-gray-50 col-span-2 p-4 rounded-lg max-w-full">
          <h3>Author: {postAuthor}</h3>
          <h1>{title}</h1>
          <br />
          <article
            className="prose mx-auto"
            dangerouslySetInnerHTML={{ __html: marked(body || "") }}
          ></article>
        </div>
      )}
    </div>
  );
};

export default Post;
