import * as React from "react";
import {TabAvailabilityRoot} from "../navigation/types";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import AvailabilityDayScreen from "../screens/AvailabilityDayScreen";
import AvailabilityProductsScreen from "../screens/AvailabilityProductsScreen";
import AvailabilitySettingsScreen from "../screens/AvailabilitySettingsScreen";
import MainHeaderStaff from "../components/headers/MainHeaderStaff";

const Stack = createMaterialTopTabNavigator<TabAvailabilityRoot>();

export default function AvailabilityNavigator(): JSX.Element {
    return (
        <>
            <MainHeaderStaff title="Disponibilités" />
            <Stack.Navigator
                initialRouteName={"AvailabilityDayScreen"}
                tabBarOptions={{showLabel: false, showIcon: false}}
                tabBar={() => <></>}
                springConfig={{
                    stiffness: 500,
                    damping: 2000,
                    mass: 5,
                }}
                //swipeEnabled={false}
                lazy={true}
                lazyPreloadDistance={0}
            >
                <Stack.Screen name={"AvailabilityDayScreen"} component={AvailabilityDayScreen} />
                <Stack.Screen name={"AvailabilityProductsScreen"} component={AvailabilityProductsScreen} />
                <Stack.Screen name={"AvailabilitySettingsScreen"} component={AvailabilitySettingsScreen} />
            </Stack.Navigator>
        </>
    );
}
