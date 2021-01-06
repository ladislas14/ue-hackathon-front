import {ThemeKey} from "../../types";

export enum SETTINGS_ACTION_TYPES {
    SET_THEME = "SETTINGS/SET_THEME",
}

export type SetThemeAction = {
    type: string;
    theme: ThemeKey;
    fromCache?: boolean;
};

export type SettingsAction = SetThemeAction;

export const setTheme = (theme: ThemeKey, fromCache?: boolean): SetThemeAction =>
    ({type: SETTINGS_ACTION_TYPES.SET_THEME, theme, fromCache} as SetThemeAction);
