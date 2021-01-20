/* eslint-disable react/display-name */
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator, StackHeaderProps, StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import {MainNavigatorClientTabs, RootNavigatorScreens, TabBookingRoot, TabProfileRoot} from "./types";
import {withTheme} from "react-native-elements";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {ThemeProps} from "../types";
import MainHeader from "../components/headers/MainHeader";
import MainTabBar, {MainTabBarIcon} from "../components/tabs/MainTabBar";
import ProfileScreen from "../screens/ProfileScreen";
import BookingScreen from "../screens/BookingScreen";

const TabNavigator = createBottomTabNavigator<MainNavigatorClientTabs>();

// Component props
export type MainNavigatorProps = ThemeProps & StackScreenProps<RootNavigatorScreens, "MainScreenClient">;

function MainNavigatorClientComponent(): JSX.Element {
    return (
        <TabNavigator.Navigator
            initialRouteName="TabBooking"
            tabBar={(props: BottomTabBarProps) => <MainTabBar {...props} />}
        >
            <TabNavigator.Screen
                name="TabBooking"
                component={TabBookingNavigator}
                options={{
                    //tabBarLabel: (props) => <MainTabBarLabel text={i18n.t("tabs.home")} {...props} />,
                    tabBarIcon: (props) => <MainTabBarIcon name="shopping-cart" {...props} />,
                }}
            />
            <TabNavigator.Screen
                name="TabProfile"
                component={TabProfileNavigator}
                options={{
                    tabBarIcon: (props) => <MainTabBarIcon name="person" {...props} />,
                }}
            />
        </TabNavigator.Navigator>
    );
}

const BookingStack = createStackNavigator<TabBookingRoot>();

const TabBookingNavigator = (): JSX.Element => (
    <BookingStack.Navigator screenOptions={{header: MainHeader}}>
        <BookingStack.Screen name="BookingScreen" component={BookingScreen} />
    </BookingStack.Navigator>
);

const ProfileStack = createStackNavigator<TabProfileRoot>();

const TabProfileNavigator = withTheme(
    ({theme}: ThemeProps): JSX.Element => (
        <ProfileStack.Navigator screenOptions={{header: MainHeader}}>
            <ProfileStack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: true,
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
        </ProfileStack.Navigator>
    ),
);

export default withTheme(MainNavigatorClientComponent);