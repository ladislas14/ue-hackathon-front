import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";

export type StaffOrdersScreenProps = ThemeProps;

class StaffOrdersScreen extends React.Component<StaffOrdersScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);

        return (
            <ScreenWrapper>
                <Text style={styles.title}>Inventaire des commandes</Text>
                <View style={styles.container}></View>
            </ScreenWrapper>
        );
    }
}

const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            padding: 50,
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            width: "100%",
            textAlign: "center",
            paddingTop: 30,
            fontSize: 35,
            color: theme.text,
        },
    });
});

export default withTheme(StaffOrdersScreen);
