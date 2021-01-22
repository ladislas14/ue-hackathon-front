import {AppThunk} from "../types";
import {CreateProfileDto, ResponseUserDto} from "../../api/backend/dto";
import {User} from "../../model/user";
import {convertDtoToUser} from "../../api/backend/converters";
import {HttpStatusCode} from "../../constants/http-status";
import {requestBackend} from "../../api/backend";

export enum PROFILE_ACTION_TYPES {
    LOAD_USER_PROFILE = "PROFILE/LOAD_USER_PROFILE",
    PROFILE_CREATE = "PROFILE/CREATE",
    PROFILE_CREATE_SUCCESS = "PROFILE/CREATE_SUCCESS",
    FETCH_USER_SUCCESS = "PROFILE/FETCH_USER_SUCCESS",
    FETCH_PROFILE_SUCCESS = "PROFILE/FETCH_PROFILE_SUCCESS",
}

export type LoadUserProfileAction = {
    type: string;
    id: string;
};

export type CreateProfileAction = {
    type: string;
    user: CreateProfileDto;
};

export type CreateProfileSuccessAction = {
    type: string;
    user: User;
};

export type FetchUserSuccessAction = {
    type: string;
    user: User;
};

export type ProfileAction = CreateProfileAction | CreateProfileSuccessAction | FetchUserSuccessAction;

const createProfileSuccess = (user: User): CreateProfileSuccessAction => ({
    type: PROFILE_ACTION_TYPES.PROFILE_CREATE_SUCCESS,
    user,
});

export const createProfile = (profile: CreateProfileDto): AppThunk => async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await requestBackend("users", "PATCH", {}, profile, token, true);
    if (response.status === HttpStatusCode.OK) {
        const payload = (response as unknown) as ResponseUserDto;
        const user = convertDtoToUser(payload);
        dispatch(createProfileSuccess(user));
    }
};

export const fetchUser = (): AppThunk => async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await requestBackend("auth/me", "GET", {}, {}, token);
    if (response.status === HttpStatusCode.OK) {
        const payload = (response as unknown) as ResponseUserDto;
        const user = convertDtoToUser(payload);
        dispatch(fetchUserSuccess(user));
    }
};

const fetchUserSuccess = (user: User): FetchUserSuccessAction => ({
    type: PROFILE_ACTION_TYPES.FETCH_USER_SUCCESS,
    user,
});
