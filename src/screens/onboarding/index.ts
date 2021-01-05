import {OnboardingScreens} from "../../navigation/types";
import OnboardingNameScreen from "./OnboardingNameScreen";
import OnboardingPersonalInfoScreen from "./OnboardingPersonalInfoScreen";
import OnboardingLegalScreen from "./OnboardingLegalScreen";

export const ONBOARDING_SCREENS = {
    OnboardingNameScreen,
    OnboardingPersonalInfoScreen,
    OnboardingLegalScreen,
};

export const ONBOARDING_ORDER: (keyof OnboardingScreens)[] = [
    "OnboardingNameScreen",
    "OnboardingLegalScreen",
    "OnboardingPersonalInfoScreen",
];
