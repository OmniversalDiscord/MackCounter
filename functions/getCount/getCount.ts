import { Handler } from "@netlify/functions";
import { getMongoCollection } from "../mongo";

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const instances = await getMongoCollection();
  const count = await instances.countDocuments();

  return {
    statusCode: 200,
    body: count.toString(),
  };
};
