/* eslint-disable react/display-name */
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator, StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import {MainNavigatorStaffTabs, RootNavigatorScreens, TabAvailabilityRoot} from "./types";
import {withTheme} from "react-native-elements";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {ThemeProps} from "../types";
import MainHeader from "../components/headers/MainHeader";
import MainTabBar, {MainTabBarIcon} from "../components/tabs/MainTabBar";
import AvailabilityScreen from "../screens/AvailabilityScreen";
import DailyAvailabilityScreen from "../screens/DailyAvailabilityScreen";

const TabNavigator = createBottomTabNavigator<MainNavigatorStaffTabs>();

// Component props
export type MainNavigatorProps = ThemeProps & StackScreenProps<RootNavigatorScreens, "MainScreenStaff">;

function MainNavigatorStaffComponent(): JSX.Element {
    return (
        <TabNavigator.Navigator
            initialRouteName="TabAvailability"
            tabBar={(props: BottomTabBarProps) => <MainTabBar {...props} />}
        >
            <TabNavigator.Screen
                name="TabAvailability"
                component={TabAvailabilityNavigator}
                options={{
                    //tabBarLabel: (props) => <MainTabBarLabel text={i18n.t("tabs.home")} {...props} />,
                    tabBarIcon: (props) => <MainTabBarIcon name="shopping-cart" {...props} />,
                }}
            />
        </TabNavigator.Navigator>
    );
}

const AvailabilityStack = createStackNavigator<TabAvailabilityRoot>();

const TabAvailabilityNavigator = (): JSX.Element => (
    <AvailabilityStack.Navigator screenOptions={{header: MainHeader}}>
        <AvailabilityStack.Screen name="AvailabilityScreen" component={AvailabilityScreen} />
        <AvailabilityStack.Screen name="DailyAvailabilityScreen" component={DailyAvailabilityScreen} />
    </AvailabilityStack.Navigator>
);

export default withTheme(MainNavigatorStaffComponent);
