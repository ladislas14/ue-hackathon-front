import {FontAwesome} from "@expo/vector-icons";
import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import LogOutButton from "../components/LogOutButton";
import {styleTextLight} from "../styles/general";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";

export type BookingScreenProps = ThemeProps;

class BookingScreen extends React.Component<BookingScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);

        return (
            <ScreenWrapper>
                <View style={styles.container}>
                    <FontAwesome style={styles.icon} name="heart" />
                    <Text style={styles.title}>Welcome.</Text>
                    <View style={styles.separator} />
                    <Text style={styles.subtitle}>Not implemented.</Text>
                    <LogOutButton style={styles.logoutButton} />
                </View>
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
            fontSize: 24,
            color: theme.text,
            ...styleTextLight,
        },
        subtitle: {
            width: "100%",
            textAlign: "left",
            fontSize: 16,
            color: theme.text,
            marginVertical: 10,
        },
        icon: {
            color: theme.accent,
            fontSize: 48,
            paddingBottom: 20,
        },
        separator: {
            marginVertical: 30,
            height: 1,
            opacity: 0.1,
            width: "100%",
            backgroundColor: theme.text,
        },
        logoutButton: {
            marginTop: 80,
        },
    });
});

export default withTheme(BookingScreen);