import i18n from "i18n-js";
import translations from "./constants/translations";

export type SupportedLocale = "en";

export default function configureLocalization(): void {
    // Set the key-value pairs for the supported languages.
    i18n.translations = translations;

    // Set the locale on startup
    i18n.locale = "en";

    // When a value is missing from a language, fallback to another language with the key present.
    i18n.fallbacks = true;
}
