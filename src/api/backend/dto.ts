import {Gender} from "../../constants/profile-constants";
import {SuccessfulRequestResponse} from "../utils";

/* General response-related types */

// Any response from the server should follow this structure
export type BackendResponse = BackendErrorResponse | BackendSuccessfulResponse | BackendPaginatedResponse;
export type BackendErrorResponse = {status: number; errorType: string; description: string};
export type BackendSuccessfulResponse = SuccessfulRequestResponse & {data: unknown};
export type BackendPaginatedResponse = BackendSuccessfulResponse & {
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

// Only on 422 status
export type UnprocessableEntityRequestResponse = BackendErrorResponse & {
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
