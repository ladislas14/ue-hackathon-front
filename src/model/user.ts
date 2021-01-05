import {UserProfile} from "./user-profile";

export type User = {
    id: string;
    email: string;
    isVerified: boolean;
    onboarded: boolean;
    // Only available in debug mode on the staging server
    verificationToken?: string;
    profile?: UserProfile; // profile is undefined if the user hasn't been through on-boarding yet
};
