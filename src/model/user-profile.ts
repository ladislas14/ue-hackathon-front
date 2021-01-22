import {Role} from "../constants/profile-constants";

export type UserProfile = {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
    cardCode: number | null;
};
