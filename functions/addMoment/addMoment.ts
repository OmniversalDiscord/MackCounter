import {Handler} from "@netlify/functions";
import {isAuthorized} from "../isAuthorized/isAuthorized";
import {getMongoCollection} from "../mongo";

export const handler: Handler = async (event, _) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed",
        };
    }

    if (!isAuthorized(event)) {
        return {
            statusCode: 401,
            body: "Unauthorized"
        }
    }

    const moments = await getMongoCollection();
    const currentTimestamp = Date.now();

    await moments.insertOne({timestamp: currentTimestamp});

    return {
        statusCode: 200,
        body: "Added instance",
    };
};
