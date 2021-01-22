import {preTheme} from "./utils";
import {StyleSheet} from "react-native";
import {Theme} from "../types";

export const slideStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        container: {
            paddingTop: 0,
            paddingBottom: 50,
            paddingHorizontal: 30,
        },
        navigation: {
            flexDirection: "row",
        },
        navButton: {
            flex: 1,
            marginHorizontal: 20,
            maxWidth: 200,
        },
    });
});
