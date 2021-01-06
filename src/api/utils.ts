import {HttpStatusCode} from "../constants/http-status";

// Request-related types
type Primitive = string | number | boolean | Primitive[] | undefined;
export type URLParams = {[key: string]: Primitive};
export type URLBodyParams = {[key: string]: Primitive | Primitive[] | URLBodyParams | URLBodyParams[]};

// Response-related types
export type RequestResponse = SuccessfulRequestResponse | ErrorRequestResponse;
export type SuccessfulRequestResponse = {status: number} & {[key: string]: unknown};
export type ErrorRequestResponse = {status: number; errorType: string; description: string};

function encodeURIPrimitive(v: Primitive): string {
    return Array.isArray(v)
        ? v.map((v) => encodeURIPrimitive(v)).join(",")
        : encodeURIComponent(v as string | number | boolean);
}

/**
 * Encode parameters for an HTTP request (e.g. param1=value1&param2=value2)
 * @param args - A map that contains argument keys and associated values.
 * @returns the given arguments, formatted into a HTTP request suffix.
 */
export function encodeRequestParams(args: URLParams): string {
    const str = Object.keys(args)
        .filter((key: string) => args[key] !== undefined)
        .map((key: string) => `${key}=${encodeURIPrimitive(args[key])}`)
        .join("&");
    return str.length == 0 ? str : "?" + str;
}

/**
 * Send a request
 * @param url the URL to hit.
 * @param method - Which HTTP method to use (GET, PUT, POST, ...)
 * @param params - The URL parameters (?param1=value1&param2=value2 ...)
 * @param body - The body of the request.
 * @param auth - Whether or not this request should be authenticated.
 * @param verbose - Whether or not to print information about the request and response.
 * @param authToken - The authentication token. If not given, the token from the redux store will be used.
 */
export async function requestRemote(
    url: string,
    method = "GET",
    params: URLParams = {},
    headers: {[key: string]: string} = {},
    body: URLBodyParams = {},
    verbose = false,
): Promise<RequestResponse> {
    const formattedParams = encodeRequestParams(params);
    let response: Response | null = null;

    try {
        if (verbose) {
            console.log(`Sending request: ${method} ${url}${formattedParams}`);
            console.log(`  headers: ${JSON.stringify(headers)}`);
            console.log(`  body   : ${JSON.stringify(body)}`);
        }

        response = await fetch(`${url}${formattedParams}`, {
            method,
            headers,
            ...(method == "GET" ? {} : {body: JSON.stringify(body)}),
        });

        let json = {status: response.status};
        if (response.status !== HttpStatusCode.NO_CONTENT) json = {...json, ...(await response.json())};

        if (verbose) {
            console.log(`Response from ${method} ${url}:`);
            console.log(json);
        }

        return json;
    } catch (error) {
        console.error(
            `An unexpected error occured with a request to ${url}. ` +
                `Method = ${method}, params=${JSON.stringify(params)}, ` +
                `body=${JSON.stringify(body)}`,
        );
        console.error(error);
        console.error("Response received from server:", response);
        return {errorType: "error.unknown", description: "A client-side exception was raised.", status: 400};
    }
}
