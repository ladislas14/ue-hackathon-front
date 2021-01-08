/* eslint-disable react/display-name */
import {NavigationContainer, DefaultTheme, DarkTheme} from "@react-navigation/native";
import {createStackNavigator, StackHeaderProps} from "@react-navigation/stack";
import * as React from "react";
import NotFoundScreen from "../screens/NotFoundScreen";
import {RootNavigatorScreens} from "../navigation/types";
import LinkingConfiguration from "./linking-config";
import LoginNavigator from "./LoginNavigator";
import MainNavigator from "./MainNavigator";
import OnboardingNavigator from "./OnboardingNavigator";
import {rootNavigationRef, screenTitle} from "./utils";
import {withTheme} from "react-native-elements";
import {ThemeProps} from "../types";
import OnboardingSuccessfulScreen from "../screens/onboarding/OnboardingSuccessfulScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import ProfileScreen from "../screens/ProfileScreen";
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
                    name="MyProfileScreen"
                    component={MyProfileScreen}
                    options={{
                        headerShown: true,
                        title: screenTitle("MyProfileScreen"),
                        header: (props: StackHeaderProps) => (
                            <MainHeader
                                {...props}
                                backButton={true}
                                noAvatar={true}
                                noShadow={true}
                                buttonBackgroundColor={theme.accent}
                                wrapperStyle={{backgroundColor: theme.accent}}
                                color={theme.textWhite}
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                        headerShown: true,
                        title: screenTitle("ProfileScreen"),
                        header: (props: StackHeaderProps) => (
                            <MainHeader
                                {...props}
                                backButton={true}
                                noShadow={true}
                                buttonBackgroundColor={theme.accent}
                                wrapperStyle={{backgroundColor: theme.accent}}
                                color={theme.textWhite}
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name="SettingsScreen"
                    component={SettingsScreen}
                    options={{
                        headerShown: true,
                        title: screenTitle("SettingsScreen"),
                        header: (props: StackHeaderProps) => (
                            <MainHeader {...props} backButton={true} noSettingsButton={true} />
                        ),
                    }}
                />
                <Stack.Screen name="OnboardingScreen" component={OnboardingNavigator} />
                <Stack.Screen
                    name="OnboardingSuccessfulScreen"
                    component={OnboardingSuccessfulScreen}
                    options={{title: screenTitle("OnboardingSuccessfulScreen")}}
                />
                <Stack.Screen
                    name="NotFoundScreen"
                    component={NotFoundScreen}
                    options={{title: screenTitle("NotFoundScreen")}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default withTheme(Navigation);
