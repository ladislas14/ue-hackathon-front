import * as React from "react";
import {TabOrderRoot} from "../navigation/types";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import OrderDayScreen from "../screens/OrderDayScreen";
import OrdersScreen from "../screens/OrdersScreen";

const Stack = createMaterialTopTabNavigator<TabOrderRoot>();

export default function OrderNavigator(): JSX.Element {
    return (
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
            <Stack.Screen name={"OrdersScreen"} component={OrdersScreen} />
        </Stack.Navigator>
    );
}
