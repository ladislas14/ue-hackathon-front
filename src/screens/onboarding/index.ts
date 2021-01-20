import {OnboardingScreens} from "../../navigation/types";
import OnboardingNameScreen from "./OnboardingNameScreen";
import OnboardingPersonalInfoScreen from "./OnboardingPersonalInfoScreen";

export const ONBOARDING_SCREENS = {
    OnboardingNameScreen,
    OnboardingPersonalInfoScreen,
};

export const ONBOARDING_ORDER: (keyof OnboardingScreens)[] = ["OnboardingNameScreen", "OnboardingPersonalInfoScreen"];
