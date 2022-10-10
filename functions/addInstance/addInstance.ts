import { Handler } from "@netlify/functions";
import { getMongoCollection } from "../mongo";

export const handler: Handler = async (event, _) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const instances = await getMongoCollection();
  const currentTimestamp = Date.now();

  instances.insertOne({ timestamp: currentTimestamp });

  return {
    statusCode: 200,
    body: "Added instance",
  };
};
