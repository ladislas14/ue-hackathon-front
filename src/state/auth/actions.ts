import {AppThunk, OnboardingState, ValidatedThunkAction} from "../types";
import {LoginDto, ResponseUserDto, SuccessfulRequestResponse, TokenDto} from "../../api/backend/dto";
import {User} from "../../model/user";
import {requestBackend} from "../../api/utils";
import {createProfile} from "../profile/actions";
import {convertDtoToUser} from "../../api/backend/converters";
import {HttpStatusCode} from "../../constants/http-status";
import {gatherValidationErrors} from "../../api/backend/errors";
import {readCachedCredentials} from "../persistent-storage/auth";

export enum AUTH_ACTION_TYPES {
    REGISTER_BEGIN = "AUTH/REGISTER_BEGIN",
    REGISTER_SUCCESS = "AUTH/REGISTER_SUCCESS",
    REGISTER_FAILURE = "AUTH/REGISTER_FAILURE",
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
        const successResp = response as SuccessfulRequestResponse;
        dispatch(registerSuccess(successResp.data as User));
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
            const payload = (response as SuccessfulRequestResponse).data as ResponseUserDto;
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
        const payload = (response as SuccessfulRequestResponse).data as LoginDto;
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

export const setOnboardingValues = (values: Partial<OnboardingState>): SetOnboardingValuesAction => ({
    type: AUTH_ACTION_TYPES.SET_ONBOARDING_VALUES,
    values,
});

export const debugConnect = (): AppThunk => async (dispatch) => {
    const n = Math.round(1e3 * Math.random());
    const email = `test${n}.test@test.com`;
    const password = "PASSword$1";

    await dispatch(requestRegister(email, password));

    await dispatch(requestLogin(email, password));
    await dispatch(
        createProfile({
            birthdate: "2002-11-12T07:21:22.110Z",
            firstName: "Kevin" + n,
            lastName: "Test",
            gender: "male",
        }),
    );
};
