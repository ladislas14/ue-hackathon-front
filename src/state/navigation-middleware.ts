import {AnyAction, Middleware, Dispatch} from "redux";
import {rootNavigate} from "../navigation/utils";
import {AUTH_ACTION_TYPES, LogInSuccessAction} from "./auth/actions";
import {PROFILE_ACTION_TYPES} from "./profile/actions";
import {AppState} from "./types";

export const navigationMiddleware: Middleware<unknown, AppState> = (/*store: MiddlewareAPI<Dispatch, AppState>*/) => (
    next: Dispatch<AnyAction>,
) => (action: AnyAction) => {
    // TEMP action printing
    console.log(action.type);

    switch (action.type) {
        case PROFILE_ACTION_TYPES.PROFILE_CREATE_SUCCESS: {
            rootNavigate("OnboardingSuccessfulScreen");
            break;
        }
        case AUTH_ACTION_TYPES.LOG_IN_SUCCESS: {
            const {user} = action as LogInSuccessAction;
            rootNavigate(user.onboarded ? "MainScreen" : "OnboardingScreen");
            break;
        }
        case AUTH_ACTION_TYPES.LOG_OUT: {
            rootNavigate("LoginRoot", {screen: "SigninScreen"});
            break;
        }
        case AUTH_ACTION_TYPES.REGISTER_SUCCESS: {
            // rootNavigate("ValidationEmailSentScreen");
            break;
        }
    }

    next(action);
};
