import { Client } from "@hiveio/dhive";

export const hiveClient = new Client([process.env.REACT_APP_HIVE_API_URL]);

export function getBlocks() {
  return hiveClient.blockchain.getBlocks();
}

