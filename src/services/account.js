import { PrivateKey } from "@hiveio/dhive";
import { hiveClient } from "./hive";
import http from "./http";

const { REACT_APP_HIVE_USER, REACT_APP_HIVE_POSTING } = process.env;

export function getAccount() {
  return hiveClient.database.getAccounts([REACT_APP_HIVE_USER]);
}

export function getFollowing(account) {
  return http.post("condenser_api.get_following", [account, null, "blog"]);
}

console.log(REACT_APP_HIVE_POSTING);

export function follow(follower, following) {
  return hiveClient.broadcast.json(
    {
      id: "follow",
      required_posting_auths: [REACT_APP_HIVE_USER],
      required_auths: [],
      json: JSON.stringify(["follow", { follower, following, what: ["blog"] }]),
    },
    PrivateKey.from(REACT_APP_HIVE_POSTING)
  );
}

export function unfollow(follower, following) {
  return hiveClient.broadcast.json(
    {
      id: "follow",
      required_posting_auths: [REACT_APP_HIVE_USER],
      required_auths: [],
      json: JSON.stringify(["follow", { follower, following, what: [] }]),
    },
    PrivateKey.from(REACT_APP_HIVE_POSTING)
  );
}

unfollow(REACT_APP_HIVE_USER, "tattoodjay");

