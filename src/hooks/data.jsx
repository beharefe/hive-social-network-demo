import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  getPopularCommunities,
  getCommunity,
  getCommunityPosts,
  getPost,
} from "../services/communities";
import { getBlocks } from "../services/hive";
import { getAccount, getFollowing } from "../services/account";

// Get trending communities
export function useGetCommunities() {
  const {
    data: communities,
    isLoading: loading,
    error,
  } = useQuery("communities", getPopularCommunities, {
    initialData: [],
  });

  return { communities, loading, error };
}

// Get community by name
export function useGetCommunity(communityName) {
  const {
    data: community,
    isLoading: loading,
    error,
  } = useQuery(
    ["communities", communityName],
    () => getCommunity(communityName),
    {
      initialData: {},
    }
  );

  return { community, loading, error };
}

// Get trending posts for community
// and keeps this posts by author and permlink
// to use in the Post page, so we can pre-cache it
// when we fetch on the Community page
export function useGetCommunityPosts(communityName) {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading: loading,
    error,
  } = useQuery(
    ["posts", communityName],
    () => getCommunityPosts(communityName),
    {
      enabled: !!communityName,
      initialData: [],
      onSuccess: (posts) => {
        // traverse and put posts by query key to [post, author, permlink] query
        posts.forEach((post) => {
          queryClient.setQueryData(["posts", post.author, post.permlink], post);
        });
      },
    }
  );

  return { posts, loading, error };
}

// Get single post
export function useGetPost({ author, permlink }) {
  const {
    data: post,
    isLoading: loading,
    error,
  } = useQuery(
    ["posts", author, permlink],
    () => getPost({ author, permlink }),
    {
      initialData: {},
    }
  );

  return { post, loading, error };
}

// Get blockchain info data
export function useBlockInfo() {
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      for await (const block of getBlocks()) {
        queryClient.setQueryData("block-info", {
          block_id: block.block_id,
          witness: block.witness,
          server_time: new Date(block.timestamp).toUTCString(),
          transactions: block.transaction_ids.length,
        });
      }
    })();
  }, []);

  return useQuery("block-info");
}

// Get account
export function useGetAccount() {
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    getAccount()
      .then((acc) => setAccount(acc[0]))
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { account, loading, error };
}

// Get account followings
export function useGetFollowing(account) {
  const {
    data: following,
    isLoading: loading,
    error,
  } = useQuery("following-list", () => getFollowing(account), {
    initialData: [],
    enabled: !!account
  });

  return { following, loading, error };
}
