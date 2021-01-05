import {AuthAction, AUTH_ACTION_TYPES, LogInSuccessAction} from "../auth/actions";
import {ProfileState} from "../types";
import {
    CreateProfileSuccessAction,
    FetchUserSuccessAction,
    ProfileAction,
    PROFILE_ACTION_TYPES,
    SetAvatarSuccessAction,
    SetProfileFieldsSuccessAction,
} from "./actions";

export const initialState: ProfileState = {
    user: null,
};

export const profileReducer = (
    state: ProfileState = initialState,
    action: ProfileAction | AuthAction,
): ProfileState => {
    switch (action.type) {
        case AUTH_ACTION_TYPES.LOG_IN_SUCCESS: {
            const {user} = action as LogInSuccessAction;
            return {...state, user};
        }
        case PROFILE_ACTION_TYPES.PROFILE_SET_FIELDS_SUCCESS: {
            if (state.user) {
                const {fields} = action as SetProfileFieldsSuccessAction;
                return {
                    ...state,
                    user: {...state.user, profile: state.user.profile ? {...state.user.profile, ...fields} : undefined},
                };
            } else return {...state};
        }
        case PROFILE_ACTION_TYPES.PROFILE_CREATE_SUCCESS: {
            const {profile} = action as CreateProfileSuccessAction;
            return state.user ? {...state, user: {...state.user, profile}} : state;
        }
        case PROFILE_ACTION_TYPES.FETCH_USER_SUCCESS: {
            const {user} = action as FetchUserSuccessAction;
            return {...state, user};
        }
        case PROFILE_ACTION_TYPES.SET_AVATAR_SUCCESS: {
            const {avatarUrl} = action as SetAvatarSuccessAction;
            if (state.user === null) return {...state};
            else {
                return {
                    ...state,
                    user: {...state.user, profile: state.user.profile ? {...state.user.profile, avatarUrl} : undefined},
                };
            }
        }
        case AUTH_ACTION_TYPES.LOG_OUT: {
            return {...state, user: null};
        }
        default:
            return state;
    }
};
