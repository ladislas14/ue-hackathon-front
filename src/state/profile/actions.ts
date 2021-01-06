import {AppThunk} from "../types";
import {
    AvatarSuccessfulUpdatedDto,
    CreateProfileDto,
    ResponseProfileDto,
    ResponseUserDto,
    SignedUrlResponseDto,
    SuccessfulRequestResponse,
} from "../../api/backend/dto";
import {UserProfile} from "../../model/user-profile";
import {User} from "../../model/user";
import {requestBackend} from "../../api/utils";
import {convertDtoToProfile, convertDtoToUser, convertPartialProfileToCreateDto} from "../../api/backend/converters";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import {HttpStatusCode} from "../../constants/http-status";

export enum PROFILE_ACTION_TYPES {
    LOAD_USER_PROFILE = "PROFILE/LOAD_USER_PROFILE",
    PROFILE_SET_FIELDS_SUCCESS = "PROFILE/SET_FIELDS_SUCCESS",
    PROFILE_SET_FIELDS_FAILURE = "PROFILE/SET_FIELDS_FAILURE",
    PROFILE_CREATE = "PROFILE/CREATE",
    PROFILE_CREATE_SUCCESS = "PROFILE/CREATE_SUCCESS",
    FETCH_USER_SUCCESS = "PROFILE/FETCH_USER_SUCCESS",
    FETCH_PROFILE_SUCCESS = "PROFILE/FETCH_PROFILE_SUCCESS",
    SET_AVATAR = "PROFILE/SET_AVATAR",
    SET_AVATAR_SUCCESS = "PROFILE/SET_AVATAR_SUCCESS",
    SET_AVATAR_FAILURE = "PROFILE/SET_AVATAR_FAILURE",
}

export type LoadUserProfileAction = {
    type: string;
    id: string;
};

export type SetProfileFieldsAction = {
    type: string;
    fields: Partial<UserProfile>;
};

export type SetProfileFieldsFailureAction = {
    type: string;
};

export type SetProfileFieldsSuccessAction = {
    type: string;
    fields: Partial<UserProfile>;
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

export type SetAvatarSuccessAction = {
    type: string;
    avatarUrl: string;
};

export type SetAvatarFailureAction = {
    type: string;
};

export type ProfileAction =
    | SetProfileFieldsAction
    | SetProfileFieldsFailureAction
    | SetProfileFieldsSuccessAction
    | CreateProfileAction
    | CreateProfileSuccessAction
    | FetchUserSuccessAction
    | FetchProfileSuccessAction
    | SetAvatarSuccessAction
    | SetAvatarFailureAction;

const setProfileFieldsSuccess = (fields: Partial<UserProfile>): SetProfileFieldsSuccessAction => ({
    type: PROFILE_ACTION_TYPES.PROFILE_SET_FIELDS_SUCCESS,
    fields,
});

const setProfileFieldsFailure = (): SetProfileFieldsFailureAction => ({
    type: PROFILE_ACTION_TYPES.PROFILE_SET_FIELDS_FAILURE,
});

export const setProfileFields = (fields: Partial<UserProfile>): AppThunk => async (dispatch, getState) => {
    const token = getState().auth.token;

    const dto: Partial<CreateProfileDto> = convertPartialProfileToCreateDto(fields);
    const response = await requestBackend("profiles", "PATCH", {}, dto, token);
    if (response.status === HttpStatusCode.OK) dispatch(setProfileFieldsSuccess(fields));
    else dispatch(setProfileFieldsFailure());
};

const createProfileSuccess = (profile: UserProfile): CreateProfileSuccessAction => ({
    type: PROFILE_ACTION_TYPES.PROFILE_CREATE_SUCCESS,
    profile,
});

export const createProfile = (profile: CreateProfileDto): AppThunk => async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await requestBackend("profiles", "POST", {}, profile, token);
    if (response.status === HttpStatusCode.CREATED) {
        const payload = (response as SuccessfulRequestResponse).data;
        const profile = convertDtoToProfile(payload as ResponseProfileDto);
        dispatch(createProfileSuccess(profile));
    }
};

export const fetchUser = (): AppThunk => async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await requestBackend("auth/me", "GET", {}, {}, token);
    if (response.status === HttpStatusCode.OK) {
        const payload = (response as SuccessfulRequestResponse).data;
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
        const payload = (response as SuccessfulRequestResponse).data as ResponseProfileDto;
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

const setAvatarSuccess = (avatarUrl: string): SetAvatarSuccessAction => ({
    type: PROFILE_ACTION_TYPES.SET_AVATAR_SUCCESS,
    avatarUrl,
});

const setAvatarFailure = (): SetAvatarFailureAction => ({
    type: PROFILE_ACTION_TYPES.SET_AVATAR_FAILURE,
});

export const setAvatar = (image: ImageInfo): AppThunk => async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await requestBackend("common/signedUrl", "GET", {mimeType: "image/jpeg"}, {}, token);

    const fail = () => dispatch(setAvatarFailure());

    if (response.status === HttpStatusCode.OK) {
        const payload = (response as SuccessfulRequestResponse).data;
        const {fileName, s3Url} = payload as SignedUrlResponseDto;

        try {
            // Fetch the image from the device and convert it to a blob
            const imageBlob = await (await fetch(image.uri)).blob();

            // PUT the image in the aws bucket
            await fetch(s3Url, {
                method: "PUT",
                body: imageBlob,
            });

            // Submit the file name to the server
            const response2 = await requestBackend("profiles/avatar", "POST", {}, {fileName}, token);

            if (response2.status === HttpStatusCode.OK) {
                const payload2 = (response2 as SuccessfulRequestResponse).data;
                const {avatar} = payload2 as AvatarSuccessfulUpdatedDto;
                dispatch(setAvatarSuccess(avatar));
            } else fail();
        } catch (error) {
            console.error(error);
            console.error("An unexpected error occured with a request to the avatar bucket.");
            fail();
        }
    } else fail();
};
