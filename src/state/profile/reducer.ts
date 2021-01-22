import {AuthAction, AUTH_ACTION_TYPES, LogInSuccessAction} from "../auth/actions";
import {ProfileState} from "../types";
import {CreateProfileSuccessAction, FetchUserSuccessAction, ProfileAction, PROFILE_ACTION_TYPES} from "./actions";

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
        case PROFILE_ACTION_TYPES.PROFILE_CREATE_SUCCESS: {
            const {user} = action as CreateProfileSuccessAction;
            return state.user ? {...state, user: {...state.user, ...user}} : state;
        }
        case PROFILE_ACTION_TYPES.FETCH_USER_SUCCESS: {
            const {user} = action as FetchUserSuccessAction;
            return {...state, user};
        }
        case AUTH_ACTION_TYPES.LOG_OUT: {
            return {...state, user: null};
        }
        default:
            return state;
    }
};
