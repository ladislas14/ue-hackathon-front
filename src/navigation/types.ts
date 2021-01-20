import {ONBOARDING_SCREENS} from "../screens/onboarding";

export type RootNavigatorScreens = {
    MainScreenClient: undefined;
    MainScreenStaff: undefined;
    LoginRoot: undefined;
    APIScreen: undefined;
    SettingsScreen: undefined;
    OnboardingScreen: undefined;
    OnboardingSuccessfulScreen: undefined;
    NotFoundScreen: undefined;
};

export type MainNavigatorClientTabs = {
    TabBooking: undefined;
    TabProfile: undefined;
};

export type MainNavigatorStaffTabs = {
    TabAvailability: undefined;
    TabOrders: undefined;
};

// Client tabs

export type TabBookingRoot = {
    BookingDayScreen: undefined;
    BookingProductsScreen: undefined;
    BookingSettingsScreen: undefined;
};
export type TabProfileRoot = {
    ProfileScreen: undefined;
};

// Staff tabs

export type TabAvailabilityRoot = {
    AvailabilityDayScreen: undefined;
    AvailabilityProductsScreen: undefined;
    AvailabilitySettingsScreen: undefined;
};

export type TabOrderRoot = {
    OrderDayScreen: undefined;
    OrdersScreen: undefined;
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
    | keyof MainNavigatorClientTabs
    | keyof MainNavigatorStaffTabs
    | keyof TabBookingRoot
    | keyof TabProfileRoot
    | keyof LoginRoot
    | keyof LoginScreens
    | keyof OnboardingScreens;
