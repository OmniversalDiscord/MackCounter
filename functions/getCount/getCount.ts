import {Handler} from "@netlify/functions";
import {getMongoCollection} from "../mongo";

export const handler: Handler = async (event, _) => {
    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405,
            body: "Method Not Allowed",
        };
    }

    const moments = await getMongoCollection();
    const count = await moments.countDocuments();

    return {
        statusCode: 200,
        body: count.toString(),
    };
};
