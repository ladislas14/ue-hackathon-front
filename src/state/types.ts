import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action, AnyAction} from "redux";
import {RemoteValidationErrors, TokenDto} from "../api/backend/dto";
import {User} from "../model/user";
import {Gender} from "../constants/profile-constants";
import {UserSettings} from "../model/user-settings";
import {FoodProduct} from "../model/products";

export type FailableActionReturn = {success: boolean; errors?: string[]};
export type FailableThunkAction = AppThunk<Promise<FailableActionReturn>>;
export type ValidatedActionReturn = {success: boolean; errors?: RemoteValidationErrors};
export type ValidatedThunkAction = AppThunk<Promise<ValidatedActionReturn>>;

export type PaginatedState = {page: number; canFetchMore: boolean; fetching: boolean};
export const initialPaginatedState = (): PaginatedState => ({page: 1, canFetchMore: true, fetching: false});

export type OnboardingState = {
    firstname: string;
    lastname: string;
    birthdate: Date | null;
    gender: Gender | null;
};

export type AuthState = {
    authenticated: boolean;
    token: null | TokenDto;
    onboarded: boolean;
    onboarding: OnboardingState;
};

export type SettingsState = {
    userSettings: UserSettings;
};

export type ProfileState = {
    user: User | null;
};

export type AvailabilityState = {
    date: Date | null;
    inventory: {product: FoodProduct; quantity: number}[];
};

export type AppState = {
    auth: AuthState;
    settings: SettingsState;
    profile: ProfileState;
    availability: AvailabilityState;
};

// Shortcut type for redux-thunk actions (async actions)
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

// Shortcut type for redux-thunk dispatch (cast dispatch function to this for async actions)
export type MyThunkDispatch = ThunkDispatch<AppState, void, AnyAction>;
