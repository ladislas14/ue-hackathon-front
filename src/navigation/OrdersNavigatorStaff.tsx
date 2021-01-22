import * as React from "react";
import {TabOrderRoot} from "./types";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import OrderDayScreen from "../screens/OrderDayScreen";
import StaffOrdersScreen from "../screens/StaffOrdersScreen";
import MainHeaderStaff from "../components/headers/MainHeaderStaff";

const Stack = createMaterialTopTabNavigator<TabOrderRoot>();

export default function OrdersNavigatorStaff(): JSX.Element {
    return (
        <>
            <MainHeaderStaff title="Commandes" />
            <Stack.Navigator
                initialRouteName={"OrderDayScreen"}
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
                <Stack.Screen name={"OrderDayScreen"} component={OrderDayScreen} />
                <Stack.Screen name={"StaffOrdersScreen"} component={StaffOrdersScreen} />
            </Stack.Navigator>
        </>
    );
}
