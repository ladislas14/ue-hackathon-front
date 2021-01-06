import {SuccessfulRequestResponse} from "../utils";

/* General response-related types */

// Any response from the server should follow this structure
export type TrefleResponse = /*BackendErrorResponse |*/ TrefleSuccessfulResponse | TreflePaginatedResponse;
// export type BackendErrorResponse = {status: number; errorType: string; description: string};
export type TrefleSuccessfulResponse = SuccessfulRequestResponse & {data: unknown};
export type TreflePaginatedResponse<T = unknown> = TrefleSuccessfulResponse & {
    data: T[];
    meta: {
        total: number;
    };
    links: {
        first: string;
        last: string;
        next: string;
        self: string;
    };
};

/* Specific DTOs */

export type TreflePlantDto = {
    id: number;
    common_name: string | null;
    slug: string;
    scientific_name: string;
    main_species_id: number;
    image_url: string | null;
    year: number;
    bibliography: string;
    author: string;
    family_common_name: string;
    genus_id: number;
    observations: string;
    vegetable: boolean;
};
