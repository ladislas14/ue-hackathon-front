/* eslint-disable react/display-name */
import * as React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {SigninScreen, SignupScreen} from "../screens/TabLoginScreen";
import {LoginRoot, LoginScreens} from "./types";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginHeader from "../components/headers/LoginHeader";
import DebugMenu from "../components/DebugMenu";
import {DEBUG_MODE} from "../constants/config";

const SigninRoot = createMaterialTopTabNavigator<LoginScreens>();
const Tab = createMaterialTopTabNavigator<LoginRoot>();

const LoginNavigator = (): JSX.Element => (
    <Tab.Navigator swipeEnabled={false} tabBar={() => <></>}>
        <Tab.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Tab.Screen name="LoginScreens">
            {() => (
                <>
                    <LoginHeader />
                    <SigninRoot.Navigator tabBar={() => <></>} initialRouteName="SigninScreen" swipeEnabled={false}>
                        <SigninRoot.Screen name="SigninScreen" component={SigninScreen} />
                        <SigninRoot.Screen name="SignupScreen" component={SignupScreen} />
                    </SigninRoot.Navigator>

                    {DEBUG_MODE && <DebugMenu />}
                </>
            )}
        </Tab.Screen>
    </Tab.Navigator>
);

export default LoginNavigator;
