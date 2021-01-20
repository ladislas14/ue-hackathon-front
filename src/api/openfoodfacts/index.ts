import {requestRemote, RequestResponse, URLBodyParams, URLParams} from "../utils";
import {OFFResponse} from "./dto";

const BASE_URL = "https://fr.openfoodfacts.org";

/**
 * Send a request to the OpenFoodFacts API.
 * @param endpoint - Which endpoint to hit (e.g. categorie/sandwichs.json)
 * @param method - Which HTTP method to use (GET, PUT, POST, ...)
 * @param params - The URL parameters (?param1=value1&param2=value2 ...)
 * @param body - The body of the request.
 * @param verbose - Whether or not to print information about the request and response.
 */
export async function requestOFF(
    endpoint: string,
    method = "GET",
    params: URLParams = {},
    body: URLBodyParams = {},
    verbose = false,
): Promise<OFFResponse> {
    const headers: {[key: string]: string} = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    const json: RequestResponse = await requestRemote(
        `${BASE_URL}/${endpoint}`,
        method,
        params,
        headers,
        body,
        verbose,
    );

    return json;
}
