import {ThemeKey} from "../../types";

export enum SETTINGS_ACTION_TYPES {
    SET_THEME = "SETTINGS/SET_THEME",
    TOGGLE_THEME = "SETTINGS/TOGGLE_THEME",
    SET_LOCALE = "SETTINGS/SET_LOCALE",
}

export type SetThemeAction = {
    type: string;
    theme: ThemeKey;
    fromCache?: boolean;
};

export type ToggleThemeAction = {
    type: string;
};

export type SettingsAction = SetThemeAction;

export const setTheme = (theme: ThemeKey, fromCache?: boolean): SetThemeAction =>
    ({type: SETTINGS_ACTION_TYPES.SET_THEME, theme, fromCache} as SetThemeAction);

export const toggleTheme = (): ToggleThemeAction => ({type: SETTINGS_ACTION_TYPES.TOGGLE_THEME} as ToggleThemeAction);
