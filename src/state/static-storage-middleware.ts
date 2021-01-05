import {AnyAction, Middleware, Dispatch} from "redux";
import {storeStaticData} from "./persistent-storage/static";
import {SetThemeAction, SETTINGS_ACTION_TYPES} from "./settings/actions";
import {AppState} from "./types";

export const staticStorageMiddleware: Middleware<unknown, AppState> = (store) => (next: Dispatch<AnyAction>) => (
    action: AnyAction,
) => {
    switch (action.type) {
        case SETTINGS_ACTION_TYPES.SET_THEME: {
            const {theme, fromCache} = action as SetThemeAction;
            if (!fromCache) storeStaticData("theme", theme);
            break;
        }
        case SETTINGS_ACTION_TYPES.TOGGLE_THEME: {
            const {theme} = store.getState().settings.userSettings;
            storeStaticData("theme", theme === "dark" ? "light" : "dark");
            break;
        }
    }

    next(action);
};
