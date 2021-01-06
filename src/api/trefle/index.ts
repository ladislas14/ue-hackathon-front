import {requestRemote, RequestResponse, URLBodyParams, URLParams} from "../utils";
import {TrefleResponse} from "./dto";

const BASE_URL = "https://trefle.io/api/v1";
const ACCESS_TOKEN = "Dzt_2VoTswr_hRe6OjsUPJJECj5D64nl7DcqIXUTCoI";

/**
 * Send a request to the trefles API.
 * @param endpoint - Which endpoint to hit (e.g. species/search)
 * @param method - Which HTTP method to use (GET, PUT, POST, ...)
 * @param params - The URL parameters (?param1=value1&param2=value2 ...)
 * @param body - The body of the request.
 * @param verbose - Whether or not to print information about the request and response.
 */
export async function requestTrefle(
    endpoint: string,
    method = "GET",
    params: URLParams = {},
    body: URLBodyParams = {},
    verbose = false,
): Promise<TrefleResponse> {
    const headers: {[key: string]: string} = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    const json: RequestResponse = await requestRemote(
        `${BASE_URL}/${endpoint}`,
        method,
        {token: ACCESS_TOKEN, ...params},
        headers,
        body,
        verbose,
    );

    return {data: {}, ...json};
}
