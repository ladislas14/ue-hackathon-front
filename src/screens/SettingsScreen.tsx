import {StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import {Alert, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {connect, ConnectedProps} from "react-redux";
import {RootNavigatorScreens} from "../navigation/types";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import {withTheme} from "react-native-elements";
import ScreenWrapper from "./ScreenWrapper";
import ValueCard from "../components/cards/ValueCard";
import i18n from "i18n-js";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {AppState} from "../state/types";
import {APP_VERSION} from "../constants/config";
import LocalImage from "../components/LocalImage";
import {logout} from "../state/auth/actions";
import Button from "../components/Button";
import {setTheme} from "../state/settings/actions";

const reduxConnector = connect((state: AppState) => ({
    settings: state.settings.userSettings,
}));

// Component props
type SettingsScreenProps = ConnectedProps<typeof reduxConnector> & ThemeProps & StackScreenProps<RootNavigatorScreens>;

let versionClickCount = 0;

class SettingsScreen extends React.Component<SettingsScreenProps> {
    render(): JSX.Element {
        const {theme, settings, dispatch} = this.props;
        const styles = themedStyles(theme);

        return (
            <ScreenWrapper>
                <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
                    <Section theme={theme} title={i18n.t("settings.sections.general")}>
                        <ValueCard
                            style={styles.card}
                            label={i18n.t("settings.darkTheme")}
                            icon={<MaterialCommunityIcons name="theme-light-dark" style={styles.cardIcon} />}
                            oneLine={true}
                            onPress={() => dispatch(setTheme(settings.theme === "dark" ? "light" : "dark"))}
                            display={
                                <Switch
                                    value={settings.theme === "dark"}
                                    onValueChange={() =>
                                        dispatch(setTheme(settings.theme === "dark" ? "light" : "dark"))
                                    }
                                />
                            }
                            noModal={true}
                        />
                        <ValueCard
                            style={styles.card}
                            label={i18n.t("settings.logOut")}
                            icon={<MaterialCommunityIcons name="logout" style={styles.cardIcon} />}
                            oneLine={true}
                            display={
                                <Button
                                    text={i18n.t("settings.logOut")}
                                    onPress={() => dispatch(logout())}
                                    skin="rounded-filled"
                                    textStyle={styles.cardButtonText}
                                    style={[styles.oneLineCardButton, styles.redBackground]}
                                />
                            }
                            noModal={true}
                        />
                    </Section>
                    <Section
                        theme={theme}
                        title={i18n.t("settings.sections.about")}
                        icon={{name: "info", color: theme.accent}}
                    >
                        <ValueCard
                            style={styles.card}
                            label={i18n.t("settings.version")}
                            oneLine={true}
                            onPress={() => {
                                // Easter-egg trigger
                                versionClickCount++;
                                if (versionClickCount === 7) {
                                    versionClickCount = 0;
                                    Alert.alert("Insert easter egg here");
                                }
                                setTimeout(() => (versionClickCount = Math.max(0, versionClickCount - 1)), 3000);
                            }}
                            display={<Text style={styles.infoText}>{APP_VERSION}</Text>}
                            noModal={true}
                        />
                        <ValueCard
                            style={styles.card}
                            label={i18n.t("settings.termsOfService")}
                            oneLine={true}
                            onPress={() => Alert.alert("Not implemented")}
                            display={<Text style={styles.infoText}>{""}</Text>}
                            noModal={true}
                        />
                    </Section>
                    <View style={styles.logosContainer}>
                        <LocalImage imageKey="app-icon" resizeMode="contain" style={[styles.logo, styles.logoApp]} />
                    </View>
                </ScrollView>
            </ScreenWrapper>
        );
    }
}

type SectionProps = {
    theme: Theme;
    title: string;
    icon?: {name: string; color: string};
};

class Section extends React.Component<SectionProps> {
    render(): JSX.Element {
        const {title, icon, theme, children} = this.props;
        const styles = themedStyles(theme);

        return (
            <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                    {icon && <MaterialIcons name={icon.name} color={icon.color} style={styles.sectionIcon} />}
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                {children}
            </View>
        );
    }
}

const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        scroll: {
            flex: 1,
            width: "100%",
        },
        container: {
            width: "100%",
            maxWidth: 700,
            alignSelf: "center",
            paddingTop: 10,
            paddingBottom: 50,
            paddingHorizontal: 20,
        },
        section: {
            paddingVertical: 10,
            justifyContent: "flex-start",
        },
        sectionTitleContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
        },
        sectionTitle: {
            textTransform: "uppercase",
            letterSpacing: 1,
            fontSize: 11,
            color: theme.textLight,
        },
        sectionIcon: {
            fontSize: 16,
            marginRight: 5,
        },
        card: {
            marginVertical: 6,
            height: 60,
        },
        cardIcon: {
            marginRight: 6,
            padding: 0,
            fontSize: 18,
            color: theme.textLight,
        },
        localeButton: {
            height: 30,
        },
        localButtonValue: {
            fontSize: 14,
            marginHorizontal: 10,
        },
        cardButton: {
            height: 42,
            marginVertical: 0,
        },
        oneLineCardButton: {
            width: 120,
            height: 40,
            marginVertical: 0,
        },
        cardButtonText: {
            fontSize: 16,
        },
        redBackground: {
            backgroundColor: theme.error,
        },

        infoText: {
            color: theme.text,
            fontSize: 16,
        },
        logosContainer: {},
        logo: {
            marginTop: 30,
            width: "100%",
        },
        logoApp: {height: 60},
    });
});

export default reduxConnector(withTheme(SettingsScreen));
