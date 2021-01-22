import * as React from "react";
import {TabOrderRoot} from "./types";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import StaffOrdersDayScreen from "../screens/StaffOrdersDayScreen";
import StaffOrdersScreen from "../screens/StaffOrdersScreen";
import MainHeaderStaff from "../components/headers/MainHeaderStaff";

const Stack = createMaterialTopTabNavigator<TabOrderRoot>();

export default function OrdersNavigatorStaff(): JSX.Element {
    return (
        <>
            <MainHeaderStaff title="Commandes" />
            <Stack.Navigator
                initialRouteName={"StaffOrdersDayScreen"}
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
                <Stack.Screen name={"StaffOrdersDayScreen"} component={StaffOrdersDayScreen} />
                <Stack.Screen name={"StaffOrdersScreen"} component={StaffOrdersScreen} />
            </Stack.Navigator>
        </>
    );
}
