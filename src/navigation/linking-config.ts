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
            MainScreen: {
                screens: {
                    TabHome: {
                        screens: {
                            TabHomeScreen: "home",
                        },
                    },
                },
            },
            MyProfileScreen: "profile",
            ProfileScreen: "profile/:id",
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
            NotFoundScreen: "*",
        },
    },
};

export default config;
