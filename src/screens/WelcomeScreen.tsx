import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import {rootNavigate} from "../navigation/utils";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import i18n from "i18n-js";
import {StackScreenProps} from "@react-navigation/stack";
import {RootNavigatorScreens} from "../navigation/types";
import ScreenWrapper from "./ScreenWrapper";
import SemiHighlightedText from "../components/SemiHighlightedText";
import {getLocalSvg} from "../assets";
import Button from "../components/Button";
import DebugMenu from "../components/DebugMenu";
import {DEBUG_MODE} from "../constants/config";

export type WelcomeScreenProps = ThemeProps & StackScreenProps<RootNavigatorScreens>;

class WelcomeScreen extends React.Component<WelcomeScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);

        const WelcomeImage = getLocalSvg("welcome", () => this.forceUpdate());

        return (
            <ScreenWrapper>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <WelcomeImage />
                    </View>
                    <View style={styles.textContainer}>
                        <SemiHighlightedText text={i18n.t("appName")} fontSize={32} textStyle={styles.appName} />
                        <Text style={styles.subtitle} numberOfLines={3}>
                            {"Ce projet est développé dans le cadre de l'UE Hackathon à IMT Atlantique (2021)"}
                        </Text>
                    </View>
                    <View style={styles.actionsContainer}>
                        <Button
                            text={"Connexion"}
                            onPress={() => {
                                rootNavigate("LoginRoot", {
                                    screen: "LoginScreens",
                                    params: {screen: "SigninScreen"},
                                });
                            }}
                            skin="rounded-filled"
                        />
                        <Button
                            text={"Inscription"}
                            onPress={() => {
                                rootNavigate("LoginRoot", {
                                    screen: "LoginScreens",
                                    params: {screen: "SignupScreen"},
                                });
                            }}
                            skin="rounded-hollow"
                        />
                    </View>
                </View>
                {DEBUG_MODE && <DebugMenu />}
            </ScreenWrapper>
        );
    }
}

const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: "85%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "20%",
        },
        imageContainer: {
            width: "100%",
            height: 300,
        },
        textContainer: {},
        appName: {
            color: theme.accent,
            fontFamily: "RalewayBold",
        },
        subtitle: {
            color: theme.accent,
            fontFamily: "RalewaySemiBold",
            fontSize: 16,
            textAlign: "center",
            alignSelf: "center",
            maxWidth: 250,
            marginTop: 10,
        },

        actionsContainer: {
            width: "100%",
            marginBottom: 30,
        },

        apiIcon: {
            color: theme.textWhite,
            fontSize: 24,
            marginLeft: 4,
        },
    });
});

export default withTheme(WelcomeScreen);
