import {AppThunk} from "../types";
import {BackendSuccessfulResponse, CreateProfileDto, ResponseProfileDto, ResponseUserDto} from "../../api/backend/dto";
import {UserProfile} from "../../model/user-profile";
import {User} from "../../model/user";
import {convertDtoToProfile, convertDtoToUser} from "../../api/backend/converters";
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
    profile: CreateProfileDto;
};

export type CreateProfileSuccessAction = {
    type: string;
    profile: UserProfile;
};

export type FetchUserSuccessAction = {
    type: string;
    user: User;
};

export type FetchProfileSuccessAction = {
    type: string;
    profile: UserProfile;
};

export type ProfileAction =
    | CreateProfileAction
    | CreateProfileSuccessAction
    | FetchUserSuccessAction
    | FetchProfileSuccessAction;

const createProfileSuccess = (profile: UserProfile): CreateProfileSuccessAction => ({
    type: PROFILE_ACTION_TYPES.PROFILE_CREATE_SUCCESS,
    profile,
});

export const createProfile = (profile: CreateProfileDto): AppThunk => async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await requestBackend("user", "POST", {}, profile, token, true);
    if (response.status === HttpStatusCode.CREATED) {
        const payload = (response as unknown) as ResponseProfileDto;
        const profile = convertDtoToProfile(payload);
        dispatch(createProfileSuccess(profile));
    }
};

export const fetchUser = (): AppThunk => async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await requestBackend("auth/me", "GET", {}, {}, token);
    if (response.status === HttpStatusCode.OK) {
        const payload = (response as BackendSuccessfulResponse).data;
        const user = convertDtoToUser(payload as ResponseUserDto);
        dispatch(fetchUserSuccess(user));
    }
};

const fetchUserSuccess = (user: User): FetchUserSuccessAction => ({
    type: PROFILE_ACTION_TYPES.FETCH_USER_SUCCESS,
    user,
});

export const fetchProfile = (id: string): AppThunk<Promise<UserProfile | null>> => async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await requestBackend(`profiles/${id}`, "GET", {}, {}, token, true);
    if (response.status === HttpStatusCode.OK) {
        const payload = (response as BackendSuccessfulResponse).data as ResponseProfileDto;
        const profileWithMatchInfo = convertDtoToProfile(payload);
        dispatch(fetchProfileSuccess(profileWithMatchInfo));
        return profileWithMatchInfo;
    }
    return null;
};

const fetchProfileSuccess = (profile: UserProfile): FetchProfileSuccessAction => ({
    type: PROFILE_ACTION_TYPES.FETCH_PROFILE_SUCCESS,
    profile,
});
