import {Role} from "../constants/profile-constants";

export type User = {
    id: string;
    email: string;
    onboarded: boolean;
    firstName: string;
    lastName: string;
    role: Role;
    cardCode: number | null;
};
