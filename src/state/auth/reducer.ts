import {extractNamesFromEmail} from "../../model/utils";
import {PROFILE_ACTION_TYPES} from "../profile/actions";
import {AuthState, OnboardingState} from "../types";
import {
    AuthAction,
    LogInSuccessAction,
    RegisterSuccessAction,
    SetOnboardingValuesAction,
    AUTH_ACTION_TYPES,
} from "./actions";

const initialOnboardingState = (): OnboardingState => ({
    firstname: "",
    lastname: "",
    birthdate: null,
});

export const initialState: AuthState = {
    authenticated: false,
    token: null,
    onboarded: false,
    onboarding: initialOnboardingState(),
};

export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_ACTION_TYPES.REGISTER_SUCCESS: {
            const {onboarded} = (action as RegisterSuccessAction).user;
            return {
                ...state,
                onboarded,
            };
        }
        case AUTH_ACTION_TYPES.LOG_IN_SUCCESS: {
            const {
                token,
                user: {onboarded, email},
            } = <LogInSuccessAction>action;

            // Pre-fill some of the on-boarding values
            const onboarding = {...state.onboarding};
            if (!onboarded) {
                const names = extractNamesFromEmail(email);
                if (names) {
                    onboarding.firstname = names.firstname;
                    onboarding.lastname = names.lastname;
                }
            }

            return {
                ...state,
                authenticated: true,
                token,
                onboarded,
                onboarding,
            };
        }
        case AUTH_ACTION_TYPES.LOG_OUT: {
            return {
                ...state,
                token: null,
                authenticated: false,
                onboarded: false,
            };
        }
        case AUTH_ACTION_TYPES.SET_ONBOARDING_VALUES: {
            const {values} = <SetOnboardingValuesAction>action;
            return {...state, onboarding: {...state.onboarding, ...values}};
        }
        case PROFILE_ACTION_TYPES.PROFILE_CREATE_SUCCESS: {
            return {...state, onboarded: true, onboarding: initialOnboardingState()};
        }
        default:
            return state;
    }
};
