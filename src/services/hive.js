import { Client } from "@hiveio/dhive";

const { REACT_APP_HIVE_API_URL } = process.env;

export const hiveClient = new Client([REACT_APP_HIVE_API_URL]);

export function getBlocks() {
  return hiveClient.blockchain.getBlocks();
}
