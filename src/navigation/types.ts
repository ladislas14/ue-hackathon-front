import {ONBOARDING_SCREENS} from "../screens/onboarding";

export type RootNavigatorScreens = {
    MainScreen: undefined;
    LoginRoot: undefined;
    APIScreen: undefined;
    SettingsScreen: undefined;
    OnboardingScreen: undefined;
    OnboardingSuccessfulScreen: undefined;
    NotFoundScreen: undefined;
};

export type MainNavigatorTabs = {
    TabBooking: undefined;
    TabProfile: undefined;
};

// TAB: Booking

export type TabBookingRoot = {
    BookingScreen: undefined;
};

// TAB: Profile

export type TabProfileRoot = {
    ProfileScreen: undefined;
};

// Login screen

export type LoginRoot = {
    WelcomeScreen: undefined;
    LoginScreens: undefined;
};

export type LoginScreens = {
    SigninScreen: undefined;
    SignupScreen: undefined;
};

// Onboarding

export type OnboardingScreens = typeof ONBOARDING_SCREENS;

export type NavigatorRoute =
    | keyof RootNavigatorScreens
    | keyof MainNavigatorTabs
    | keyof TabBookingRoot
    | keyof TabProfileRoot
    | keyof LoginRoot
    | keyof LoginScreens
    | keyof OnboardingScreens;
