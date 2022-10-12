import { MongoClient, Collection } from "mongodb";

export async function getMongoCollection(): Promise<Collection> {
      const { MONGO_CONNECTION } = process.env;
      const client = new MongoClient(MONGO_CONNECTION!);
      await client.connect();
      return client.db().collection("moments");
}
