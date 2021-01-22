import {SvgProps} from "react-native-svg";
import SvgPlaceholder from "./components/SvgPlaceholder";
import store from "./state/store";
import {ThemeKey} from "./types";

let loaded: {[key: string]: number} = {};
let theme: ThemeKey | null = null;

async function assetDict(theme: ThemeKey, key: string): Promise<unknown> {
    switch (key) {
        case "welcome":
            return import("@assets/images/welcome.svg");
        case "login-header":
            return import("@assets/images/login.svg");
        case "background.onboarding":
            return import("@assets/images/background.svg");
        case "app-icon":
            return import("@assets/images/icon.png");
        case "large-wave-bg":
            return import("@assets/images/large-wave-bg.svg");
        case "woman-holding-phone":
            return import("@assets/images/woman-holding-phone.svg");
        default:
            return import("@assets/images/placeholder.png");
    }
}

export function getLocalImage(key: string, onLoad?: () => void): number {
    const settings = store.getState().settings.userSettings;
    if (theme != settings.theme) loaded = {};
    theme = settings.theme;

    if (loaded[key]) return loaded[key];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    assetDict(theme, key).then((v: any) => {
        loaded[key] = v.default;
        if (onLoad) onLoad();
    });

    return 0;
}

export function getLocalSvg(key: string, onLoad?: () => void): React.FC<SvgProps> {
    const raw = getLocalImage(key, onLoad);
    if (raw === 0) return SvgPlaceholder;
    return (raw as unknown) as React.FC<SvgProps>;
}
