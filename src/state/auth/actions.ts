import {AppThunk, OnboardingState, ValidatedThunkAction} from "../types";
import {BackendSuccessfulResponse, LoginDto, ResponseUserDto, TokenDto} from "../../api/backend/dto";
import {User} from "../../model/user";
import {convertDtoToUser} from "../../api/backend/converters";
import {HttpStatusCode} from "../../constants/http-status";
import {gatherValidationErrors} from "../../api/backend/errors";
import {readCachedCredentials} from "../persistent-storage/auth";
import {requestBackend} from "../../api/backend";

export enum AUTH_ACTION_TYPES {
    REGISTER_BEGIN = "AUTH/REGISTER_BEGIN",
    REGISTER_SUCCESS = "AUTH/REGISTER_SUCCESS",
    REGISTER_FAILURE = "AUTH/REGISTER_FAILURE",
    BEGIN_ONBOARDING = "AUTH/BEGIN_ONBOARDING",
    NEXT_ONBOARDING_SLIDE = "AUTH/NEXT_ONBOARDING_SLIDE",
    PREVIOUS_ONBOARDING_SLIDE = "AUTH/PREVIOUS_ONBOARDING_SLIDE",
    LOG_IN_SUCCESS = "AUTH/LOG_IN_SUCCESS",
    LOG_IN_FAILURE = "AUTH/LOG_IN_FAILURE",
    LOG_OUT = "AUTH/LOG_OUT",
    SET_ONBOARDING_VALUES = "AUTH/SET_ONBOARDING_VALUES",
}

export type RegisterBeginAction = {
    type: string;
    email: string;
    password: string;
};

export type RegisterSuccessAction = {type: string; user: User};

export type RegisterFailureAction = {type: string};

export type BeginOnboardingAction = {
    type: string;
};

export type NextOnboardingSlideAction = {
    type: string;
};

export type PreviousOnboardingSlideAction = {
    type: string;
};

export type LogInSuccessAction = {
    type: string;
    token: TokenDto;
    user: User;
    usingCachedCredentials: boolean;
};

export type LogOutAction = {type: string};

export type LogInFailureAction = {type: string};

export type SetOnboardingValuesAction = {
    type: string;
    values: Partial<OnboardingState>;
};

export type AuthAction =
    | RegisterBeginAction
    | RegisterSuccessAction
    | RegisterFailureAction
    | BeginOnboardingAction
    | NextOnboardingSlideAction
    | PreviousOnboardingSlideAction
    | LogInSuccessAction
    | LogInFailureAction
    | LogOutAction
    | SetOnboardingValuesAction;

// Register actions

const registerBegin = (email: string, password: string): RegisterBeginAction => ({
    type: AUTH_ACTION_TYPES.REGISTER_BEGIN,
    email,
    password,
});

// Redux-thunk asynchronous action creator
export const requestRegister = (email: string, password: string): ValidatedThunkAction => async (dispatch) => {
    dispatch(registerBegin(email, password));

    const response = await requestBackend("auth/register", "POST", {}, {email, password});

    if (response.status == HttpStatusCode.OK) {
        const successResp = response as BackendSuccessfulResponse;
        dispatch(registerSuccess(successResp.data as User));
        dispatch(requestLogin(email, password));
        return {success: true};
    } else {
        dispatch(registerFailure());
        return {success: false, errors: gatherValidationErrors(response)};
    }
};

const registerSuccess = (user: User): RegisterSuccessAction => ({
    type: AUTH_ACTION_TYPES.REGISTER_SUCCESS,
    user,
});

const registerFailure = (): RegisterFailureAction => ({
    type: AUTH_ACTION_TYPES.REGISTER_FAILURE,
});

// Log in actions

const loginSuccess = (token: TokenDto, user: User, usingCachedCredentials: boolean): LogInSuccessAction => ({
    type: AUTH_ACTION_TYPES.LOG_IN_SUCCESS,
    token,
    user,
    usingCachedCredentials,
});

const loginFailure = (): LogInFailureAction => ({
    type: AUTH_ACTION_TYPES.LOG_IN_FAILURE,
});

export const attemptLoginFromCache = (): AppThunk<Promise<User | undefined>> => async (
    dispatch,
): Promise<User | undefined> => {
    const credentials = await readCachedCredentials();

    if (credentials) {
        const {token} = credentials;

        // Get user information
        const response = await requestBackend("auth/me", "GET", {}, {}, token);

        if (response.status == HttpStatusCode.OK) {
            const payload = (response as unknown) as ResponseUserDto;
            const user = convertDtoToUser(payload);
            dispatch(loginSuccess(token, user, true));
            return user;
        } else dispatch(loginFailure()); // e.g. token is invalid
    }
    // If no credentials are available in cache, the action does nothing.
    return undefined;
};

export const requestLogin = (email: string, password: string): ValidatedThunkAction => async (dispatch) => {
    const response = await requestBackend("auth/login", "POST", {}, {email, password});

    if (response.status == HttpStatusCode.OK) {
        const payload = (response as unknown) as LoginDto;
        dispatch(loginSuccess(payload.token, convertDtoToUser(payload.user), false));
        return {success: true};
    } else {
        dispatch(loginFailure());
        return {success: false, errors: gatherValidationErrors(response)};
    }
};

export const logout = (): LogOutAction => ({
    type: AUTH_ACTION_TYPES.LOG_OUT,
});

// Onboarding actions

export const beginOnboarding = (): BeginOnboardingAction => ({
    type: AUTH_ACTION_TYPES.BEGIN_ONBOARDING,
});

export const nextOnboardingSlide = (): NextOnboardingSlideAction => ({
    type: AUTH_ACTION_TYPES.NEXT_ONBOARDING_SLIDE,
});

export const previousOnboardingSlide = (): PreviousOnboardingSlideAction => ({
    type: AUTH_ACTION_TYPES.PREVIOUS_ONBOARDING_SLIDE,
});

export const setOnboardingValues = (values: Partial<OnboardingState>): SetOnboardingValuesAction => ({
    type: AUTH_ACTION_TYPES.SET_ONBOARDING_VALUES,
    values,
});
