import {Gender} from "../constants/profile-constants";

export type UserProfile = {
    id: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    gender: Gender;
    avatarUrl: string;
};
