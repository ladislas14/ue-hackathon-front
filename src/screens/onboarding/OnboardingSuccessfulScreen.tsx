import * as React from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import {rootNavigate} from "../../navigation/utils";
import {preTheme} from "../../styles/utils";
import {Theme, ThemeProps} from "../../types";
import i18n from "i18n-js";
import ScreenWrapper from "../ScreenWrapper";
import {getLocalSvg} from "../../assets";
import Button from "../../components/Button";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../state/types";

const reduxConnector = connect((state: AppState) => ({
    user: state.profile.user,
}));

export type OnboardingSuccessfulScreenProps = ThemeProps & ConnectedProps<typeof reduxConnector>;

class OnboardingSuccessfulScreen extends React.Component<OnboardingSuccessfulScreenProps> {
    render(): JSX.Element {
        const {theme, user} = this.props;
        const styles = themedStyles(theme);

        const BackgroundSvg = getLocalSvg("large-wave-bg", () => this.forceUpdate());
        const ForegroundSvg = getLocalSvg("woman-holding-phone", () => this.forceUpdate());

        const height = Dimensions.get("window").height;

        return (
            <ScreenWrapper>
                <View style={styles.root}>
                    <View
                        style={{
                            position: "absolute",
                            width: "100%",
                            ...(height > 1000 ? {bottom: 0} : {top: 250}),
                        }}
                    >
                        <BackgroundSvg width="100%" />
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            width: "100%",
                            ...(height > 1000 ? {bottom: -200} : {top: 350}),
                            left: -100,
                        }}
                    >
                        <ForegroundSvg />
                    </View>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.title}>Bienvenue parmi nous !</Text>
                            <Text style={styles.subtitle}>Votre compte a bien été créé.</Text>
                        </View>
                        <Button
                            text="Commencer"
                            onPress={() =>
                                rootNavigate(user?.role === "staff" ? "MainScreenStaff" : "MainScreenClient")
                            }
                            skin="rounded-filled"
                            style={{opacity: 0.9}}
                        />
                    </View>
                </View>
            </ScreenWrapper>
        );
    }
}

const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        root: {
            width: "100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "center",
        },
        largeDeviceLeftPanel: {
            width: "50%",
            backgroundColor: "#0071BB",
        },
        container: {
            width: "100%",
            height: "100%",
            paddingTop: 100,
            paddingBottom: 100,
            paddingHorizontal: 60,
            justifyContent: "space-between",
            alignItems: "flex-start",
        },
        title: {
            fontSize: 36,
            letterSpacing: 0.5,
            lineHeight: 40,
            color: theme.text,
            fontWeight: "600",
            maxWidth: 240,
            textAlign: "left",
        },
        subtitle: {
            fontSize: 18,
            marginTop: 20,
            color: theme.text,
            textAlign: "left",
        },
    });
});

export default reduxConnector(withTheme(OnboardingSuccessfulScreen));
