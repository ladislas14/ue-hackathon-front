import {Alert} from "react-native";
import {BACKEND_URL} from "../../constants/config";
import {requestRemote, RequestResponse, URLBodyParams, URLParams} from "../utils";
import {BackendResponse, TokenDto} from "./dto";

/**
 * Send a request to the backend.
 * @param endpoint - Which endpoint to hit (e.g. auth/login)
 * @param method - Which HTTP method to use (GET, PUT, POST, ...)
 * @param params - The URL parameters (?param1=value1&param2=value2 ...)
 * @param body - The body of the request.
 * @param authToken - The authentication token. If not given, the token from the redux store will be used.
 * @param verbose - Whether or not to print information about the request and response.
 */
export async function requestBackend(
    endpoint: string,
    method = "GET",
    params: URLParams = {},
    body: URLBodyParams = {},
    authToken: TokenDto | null | undefined = undefined,
    verbose = false,
    stringParams?: string,
): Promise<BackendResponse> {
    const headers: {[key: string]: string} = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    if (authToken !== undefined) {
        if (authToken === null) {
            console.error(`Cannot authentify request to ${endpoint} : no auth token available.`);
            Alert.alert("A request could not be authenticated.");
            return {errorType: "error.no-auth", description: "Endpoint requires authentication", status: 401};
        } else headers.Authorization = `Bearer ${authToken.accessToken}`;
    }

    const json: RequestResponse = await requestRemote(
        `${BACKEND_URL}/${endpoint}`,
        method,
        params,
        headers,
        body,
        verbose,
        stringParams,
    );

    return {data: {}, ...json};
}
