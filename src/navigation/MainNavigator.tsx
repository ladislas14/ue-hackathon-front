/* eslint-disable react/display-name */
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator, StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import {MainNavigatorTabs, RootNavigatorScreens, TabHomeRoot} from "../navigation/types";
import {withTheme} from "react-native-elements";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {ThemeProps} from "../types";
import TabHomeScreen from "../screens/TabHomeScreen";
import {screenTitle} from "./utils";
import MainHeader from "../components/headers/MainHeader";
import MainTabBar, {MainTabBarIcon} from "../components/tabs/MainTabBar";

const TabNavigator = createBottomTabNavigator<MainNavigatorTabs>();

// Component props
export type MainNavigatorProps = ThemeProps & StackScreenProps<RootNavigatorScreens, "MainScreen">;

function MainNavigatorComponent(): JSX.Element {
    return (
        <TabNavigator.Navigator
            initialRouteName="TabHome"
            tabBar={(props: BottomTabBarProps) => <MainTabBar {...props} />}
        >
            <TabNavigator.Screen
                name="TabHome"
                component={TabHomeNavigator}
                options={{
                    //tabBarLabel: (props) => <MainTabBarLabel text={i18n.t("tabs.home")} {...props} />,
                    tabBarIcon: (props) => <MainTabBarIcon name="home" {...props} />,
                }}
            />
        </TabNavigator.Navigator>
    );
}

const TabHomeStack = createStackNavigator<TabHomeRoot>();

const TabHomeNavigator = (): JSX.Element => (
    <TabHomeStack.Navigator screenOptions={{header: MainHeader}}>
        <TabHomeStack.Screen
            name="TabHomeScreen"
            component={TabHomeScreen}
            options={{title: screenTitle("TabHomeScreen")}}
        />
    </TabHomeStack.Navigator>
);

export default withTheme(MainNavigatorComponent);
