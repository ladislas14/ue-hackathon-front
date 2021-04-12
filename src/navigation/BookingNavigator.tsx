import * as React from "react";
import {TabBookingRoot} from "./types";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import BookingDayScreen from "../screens/BookingDayScreen";
import BookingProductsScreen from "../screens/BookingProductsScreen";
import BookingSettingsScreen from "../screens/BookingSettingsScreen";
import MainHeaderClient from "../components/headers/MainHeaderClient";

const Stack = createMaterialTopTabNavigator<TabBookingRoot>();

export default function BookingNavigator(): JSX.Element {
    return (
        <>
            <MainHeaderClient title="Réservation" />
            <Stack.Navigator
                initialRouteName={"BookingDayScreen"}
                swipeEnabled={false}
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
                <Stack.Screen name={"BookingDayScreen"} component={BookingDayScreen} />
                <Stack.Screen name={"BookingProductsScreen"} component={BookingProductsScreen} />
                <Stack.Screen name={"BookingSettingsScreen"} component={BookingSettingsScreen} />
            </Stack.Navigator>
        </>
    );
}
