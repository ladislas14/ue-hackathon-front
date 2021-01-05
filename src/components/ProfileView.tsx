import * as React from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import i18n from "i18n-js";
import {withTheme} from "react-native-elements";
import {ScrollView} from "react-native";
import {FormattedDate} from "./FormattedDate";
import {UserProfile} from "../model/user-profile";
import {Theme, ThemeProps} from "../types";
import {preTheme} from "../styles/utils";
import ValueCard from "./cards/ValueCard";
import EnlargeableAvatar from "./EnlargeableAvatar";
import FormattedGender from "./FormattedGender";
import WavyHeader from "./headers/WavyHeader";

// Component props
export type ProfileViewProps = ThemeProps & {
    profile: UserProfile | null;
    actionBar?: JSX.Element;
};

function Spacer(): JSX.Element {
    return <View style={{height: 25}}></View>;
}

class ProfileView extends React.Component<ProfileViewProps> {
    render() {
        const {theme, profile, actionBar} = this.props;
        const styles = themedStyles(theme);

        const fullName = profile ? profile.firstName + " " + profile.lastName : "";

        const profileFieldComponents = (
            <>
                <ValueCard
                    blank={!profile}
                    label={i18n.t("dateOfBirth")}
                    display={profile ? <FormattedDate style={styles.cardText} date={profile.birthdate} /> : <></>}
                    noModal={true}
                />
                <Spacer />
                <ValueCard
                    blank={!profile}
                    label={i18n.t("gender")}
                    display={profile ? <FormattedGender style={styles.cardText} gender={profile.gender} /> : <></>}
                    noModal={true}
                />
                <Spacer />
            </>
        );

        return (
            <>
                <WavyHeader style={styles.header} color={theme.accent}>
                    <EnlargeableAvatar
                        profile={profile || undefined}
                        size={120}
                        rounded
                        containerStyle={styles.avatarContainer}
                        activeOpacity={0.8}
                    />
                    {!profile && (
                        <ActivityIndicator size="large" color={theme.textWhite} style={styles.loadingIndicator} />
                    )}
                    <Text style={styles.name}>{fullName}</Text>
                    <Text />
                    {actionBar}
                </WavyHeader>
                <ScrollView
                    style={styles.scrollWrapper}
                    contentContainerStyle={styles.formWrapper}
                    keyboardShouldPersistTaps="handled"
                >
                    {profileFieldComponents}
                </ScrollView>
            </>
        );
    }
}

export const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        titleWrapper: {
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginBottom: 20,
        },
        title: {
            fontSize: 22,
            color: theme.text,
        },
        buttonSend: {
            flex: 1,
            backgroundColor: theme.accent,
            marginLeft: 6,
        },
        header: {
            alignItems: "center",
        },
        scrollWrapper: {
            width: "100%",
        },
        formWrapper: {
            width: "90%",
            maxWidth: 600,
            alignSelf: "center",
            paddingTop: 80,
            paddingBottom: 20,
        },
        loadingIndicator: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 140,
        },
        name: {
            fontSize: 24,
            color: theme.textWhite,
            marginTop: 10,
            height: 30,
        },
        university: {
            fontSize: 14,
            color: theme.textWhite,
        },
        universityContainer: {
            height: 25,
        },
        avatarContainer: {
            borderColor: theme.cardBackground,
            borderWidth: 2,
            backgroundColor: theme.accentSecondary,
        },
        cardText: {
            color: theme.text,
        },
    });
});

export default withTheme(ProfileView);
