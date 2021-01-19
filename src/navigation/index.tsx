/* eslint-disable react/display-name */
import {NavigationContainer, DefaultTheme, DarkTheme} from "@react-navigation/native";
import {createStackNavigator, StackHeaderProps} from "@react-navigation/stack";
import * as React from "react";
import {RootNavigatorScreens} from "../navigation/types";
import LinkingConfiguration from "./linking-config";
import LoginNavigator from "./LoginNavigator";
import MainNavigator from "./MainNavigator";
import OnboardingNavigator from "./OnboardingNavigator";
import {rootNavigationRef} from "./utils";
import {withTheme} from "react-native-elements";
import {ThemeProps} from "../types";
import OnboardingSuccessfulScreen from "../screens/onboarding/OnboardingSuccessfulScreen";
import MainHeader from "../components/headers/MainHeader";
import SettingsScreen from "../screens/SettingsScreen";
import APIScreen from "../screens/APIScreen";

type RootNavigationProps = React.PropsWithRef<ThemeProps & {initialRoute?: keyof RootNavigatorScreens}> & {
    onReady?: () => void;
};

// The root stack navigator
const Stack = createStackNavigator<RootNavigatorScreens>();

let consumedInitialRoute = false;
let previousRoute: string | undefined = undefined;

// Handle route changes
function onStateChange() {
    const route = rootNavigationRef.current?.getCurrentRoute();
    if (route) previousRoute = route.name;
}

function Navigation({theme, initialRoute, onReady}: RootNavigationProps): JSX.Element {
    // Ensure we do not go back to the initial route when the navigation container updates (e.g. on theme change)
    const initialRouteName = consumedInitialRoute ? (previousRoute as keyof RootNavigatorScreens) : initialRoute;
    consumedInitialRoute = true;

    const reactNavigationTheme = {
        dark: theme.id === "dark",
        colors: {
            ...(theme.id === "dark" ? DarkTheme : DefaultTheme).colors,
            background: theme.background,
        },
    };

    return (
        <NavigationContainer
            ref={rootNavigationRef}
            linking={LinkingConfiguration}
            theme={reactNavigationTheme}
            onReady={() => {
                onStateChange();
                if (onReady) onReady();
            }}
            onStateChange={onStateChange}
        >
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={initialRouteName}>
                <Stack.Screen name="LoginRoot" component={LoginNavigator} />
                <Stack.Screen name="MainScreen" component={MainNavigator} />
                <Stack.Screen name="APIScreen" component={APIScreen} />
                <Stack.Screen
                    name="SettingsScreen"
                    component={SettingsScreen}
                    options={{
                        headerShown: true,
                        header: (props: StackHeaderProps) => (
                            <MainHeader {...props} backButton={true} noSettingsButton={true} />
                        ),
                    }}
                />
                <Stack.Screen name="OnboardingScreen" component={OnboardingNavigator} />
                <Stack.Screen name="OnboardingSuccessfulScreen" component={OnboardingSuccessfulScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default withTheme(Navigation);
