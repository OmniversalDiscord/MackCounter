import {Handler, HandlerEvent} from "@netlify/functions";

export function isAuthorized(event: HandlerEvent): boolean {
    let header = event.headers.authorization;
    return header === `Bearer ${process.env.ADMIN_TOKEN}`;
}

export const handler: Handler = async (event, _) => {
    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405,
            body: "Method Not Allowed",
        };
    }
    
    return {
        statusCode: 200,
        body: isAuthorized(event).toString()
    };
};