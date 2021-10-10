import HTTP from "./http";
import { hiveClient } from "./hive";

export async function getPopularCommunities() {
  const communities = await HTTP.post("bridge.list_pop_communities", {
    limit: 10,
  });
  return communities.map(([key, title]) => ({ key, title }));
}

export async function getCommunity(name) {
  return hiveClient.hivemind.getCommunity({
    name,
  });
}

export async function getCommunityPosts(name) {
  const posts = await HTTP.post("bridge.get_ranked_posts", {
    limit: 10,
    sort: "trending",
    tag: name,
  });

  return posts;
}

export async function getPost({ permlink, author }) {
  const post = await HTTP.post("bridge.get_post", {
    author,
    permlink,
  });

  return post;
}
