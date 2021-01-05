import {UserProfile} from "./user-profile";

export type User = {
    id: string;
    email: string;
    onboarded: boolean;
    profile?: UserProfile; // profile is undefined if the user hasn't been through on-boarding yet
};
