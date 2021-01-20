import {Platform, TextStyle} from "react-native";

export const styleTextThin: TextStyle =
    Platform.OS == "android" ? {fontFamily: "sans-serif-thin"} : {fontWeight: "100"};

export const styleTextLight: TextStyle =
    Platform.OS == "android" ? {fontFamily: "sans-serif-light"} : {fontWeight: "200"};

export const BLUR_HEADER_INTENSITY = Platform.OS === "ios" ? 100 : 320;
export const BLUR_TAB_INTENSITY = Platform.OS === "ios" ? 100 : 320;
