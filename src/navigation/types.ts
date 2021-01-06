import {ONBOARDING_SCREENS} from "../screens/onboarding";

export type RootNavigatorScreens = {
    MainScreen: undefined;
    LoginRoot: undefined;
    APIScreen: undefined;
    MyProfileScreen: undefined;
    ProfileScreen: undefined;
    SettingsScreen: undefined;
    OnboardingScreen: undefined;
    OnboardingSuccessfulScreen: undefined;
    NotFoundScreen: undefined;
};

export type MainNavigatorTabs = {
    TabHome: undefined;
};

// TAB: Home

export type TabHomeRoot = {
    TabHomeScreen: undefined;
};

// Login screen

export type LoginRoot = {
    WelcomeScreen: undefined;
    LoginScreens: undefined;
};

export type LoginScreens = {
    ForgotPasswordScreen: undefined;
    SigninScreen: undefined;
    SignupScreen: undefined;
};

// Onboarding

export type OnboardingScreens = typeof ONBOARDING_SCREENS;

export type NavigatorRoute =
    | keyof RootNavigatorScreens
    | keyof MainNavigatorTabs
    | keyof TabHomeRoot
    | keyof LoginRoot
    | keyof LoginScreens
    | keyof OnboardingScreens;
