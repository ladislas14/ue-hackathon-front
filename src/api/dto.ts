import {Gender} from "../constants/profile-constants";

/* General response-related types */

// Any response from the server should follow this structure
export type RequestResponse = SuccessfulRequestResponse | UnprocessableEntityRequestResponse | ErrorRequestResponse;
export type SuccessfulRequestResponse = {status: number; data: unknown} & {[key: string]: unknown};
export type PaginatedRequestResponse = SuccessfulRequestResponse & {
    meta: {
        currentPage: number;
        itemCount: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
    };
    links: {
        first: string;
        last: string;
        next: string;
        previous: string;
    };
};

export type ErrorRequestResponse = {status: number; errorType: string; description: string};

// Only on 422 status
export type UnprocessableEntityRequestResponse = ErrorRequestResponse & {
    errors: {property: string; codes: {description: string; code: string}[]}[];
};

export type RemoteValidationErrors = {general: string; fields: {[key: string]: string}};

/* Specific DTOs */

export type UserRole = "user" | "admin";

export type ResponseUserDto = {
    id: string;
    role: UserRole;
    email: string;
    isVerified: boolean;
    onboarded: boolean;
    profile: ResponseProfileDto;
};

export type TokenDto = {
    expiresIn: number;
    accessToken: string;
};

export type LoginDto = {
    user: ResponseUserDto;
    token: TokenDto;
};

export type CreateProfileDto = {
    firstName: string;
    lastName: string;
    gender: Gender;
    birthdate: string;
};

export type ResponseProfileDto = CreateProfileDto & {
    id: string;
    avatar: string;
};

export type SignedUrlResponseDto = {
    fileName: string;
    s3Url: string;
};

export type AvatarSuccessfulUpdatedDto = {
    avatar: string;
};
