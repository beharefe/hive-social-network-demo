import { useEffect, useState } from "react";
import {
  getPopularCommunities,
  getCommunity,
  getCommunityPosts,
  getPost,
} from "../services/communities";
import { getBlocks } from "../services/hive";

// Get trending communities
export function useGetCommunities() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    getPopularCommunities()
      .then(setCommunities)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { communities, loading, error };
}

// Get community by name
export function useGetCommunity(communityName) {
  const [community, setCommunity] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    getCommunity(communityName)
      .then(setCommunity)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [communityName]);

  return { community, loading, error };
}

// Get trending posts for community
export function useGetCommunityPosts(communityName) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    getCommunityPosts(communityName)
      .then(setPosts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [communityName]);

  // dependent on communityName
  if (!communityName) return [];

  return { posts, loading, error };
}

// Get single post
export function useGetPost({ author, permlink }) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    getPost({ author, permlink })
      .then(setPost)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [author, permlink]);

  return { post, loading, error };
}

// Get blockchain info data
export function useBlockInfo() {
  const [info, setInfo] = useState();

  useEffect(() => {
    (async () => {
      for await (const block of getBlocks()) {
        setInfo({
          block_id: block.block_id,
          witness: block.witness,
          server_time: new Date(block.timestamp).toUTCString(),
          transactions: block.transaction_ids.length,
        });
      }
    })();
  }, []);

  return info;
}
