/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Constants from "expo-constants";

export enum Environment {
    Staging = "STAGING",
    Production = "PRODUCTION",
}

const extra = Constants.manifest.extra;

export const APP_VERSION: string = Constants.manifest.version!;
export const APP_SCHEME: string = Constants.manifest.scheme;
export const ENVIRONMENT: Environment = extra.TARGET;
// export const DEBUG_MODE: boolean = extra.DEBUG;
export const DEBUG_MODE = false;
export const SERVER_HOST: string = extra.SERVER_HOST;
export const BACKEND_URL: string = extra.SERVER_URL;

/**
 * The buffer delay before sending a remote request when typing in a search bar (ms).
 */
export const SEARCH_BUFFER_DELAY = 250;
