import {LinkingOptions} from "@react-navigation/native";
import * as Linking from "expo-linking";
import {APP_SCHEME} from "../constants/config";

const config: LinkingOptions = {
    prefixes: [Linking.makeUrl("/"), `${APP_SCHEME}://`],
    config: {
        screens: {
            LoginRoot: {
                screens: {
                    WelcomeScreen: "welcome",
                    LoginScreens: {
                        screens: {
                            SigninScreen: "login",
                            SignupScreen: "signup",
                        },
                    },
                },
            },
            MainScreenClient: {
                screens: {
                    TabBooking: {
                        screens: {
                            BookingScreen: "home",
                        },
                    },
                    TabProfile: {
                        screens: {
                            ProfileScreen: "profile",
                        },
                    },
                },
            },
            MainScreenStaff: {
                screens: {
                    TabAvailability: {
                        screens: {
                            AvailabilityDayScreen: "availability/day",
                            AvailabilityProductsScreen: "availability/products",
                            AvailabilitySettingsScreen: "availability/settings",
                        },
                    },
                },
            },
            SettingsScreen: "settings",
            OnboardingScreen: {
                screens: {
                    OnboardingNameScreen: "onboarding/name",
                    OnboardingPersonalInfoScreen: "onboarding/info",
                    OnboardingLegalScreen: "onboarding/tos",
                    OnboardingPrivacyScreen: "onboarding/privacy",
                },
            },
            OnboardingSuccessfulScreen: "onboarding/success",
        },
    },
};

export default config;
