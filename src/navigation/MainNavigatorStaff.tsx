/* eslint-disable react/display-name */
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import {MainNavigatorStaffTabs, RootNavigatorScreens} from "./types";
import {withTheme} from "react-native-elements";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {ThemeProps} from "../types";
import MainTabBar, {MainTabBarIcon} from "../components/tabs/MainTabBar";
import AvailabilityNavigator from "./AvailabilityNavigator";

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
                component={AvailabilityNavigator}
                options={{
                    //tabBarLabel: (props) => <MainTabBarLabel text={i18n.t("tabs.home")} {...props} />,
                    tabBarIcon: (props) => <MainTabBarIcon name="shopping-cart" {...props} />,
                }}
            />
        </TabNavigator.Navigator>
    );
}

export default withTheme(MainNavigatorStaffComponent);
