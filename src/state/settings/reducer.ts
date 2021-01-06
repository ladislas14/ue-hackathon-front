import {SetThemeAction, SettingsAction, SETTINGS_ACTION_TYPES} from "./actions";
import {SettingsState} from "../types";

export const initialState: SettingsState = {
    userSettings: {
        theme: "light",
    },
};

export const settingsReducer = (state: SettingsState = initialState, action: SettingsAction): SettingsState => {
    switch (action.type) {
        case SETTINGS_ACTION_TYPES.SET_THEME: {
            const {theme} = action as SetThemeAction;
            return {...state, userSettings: {...state.userSettings, theme}};
        }
        default:
            return state;
    }
};
