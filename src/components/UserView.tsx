import * as React from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import i18n from "i18n-js";
import {withTheme} from "react-native-elements";
import {ScrollView} from "react-native";
import {FormattedDate} from "./FormattedDate";
import {Theme, ThemeProps} from "../types";
import {preTheme} from "../styles/utils";
import ValueCard from "./cards/ValueCard";
import WavyHeader from "./headers/WavyHeader";
import {User} from "../model/user";

// Component props
export type UserViewProps = ThemeProps & {
    user: User | null;
    actionBar?: JSX.Element;
};

function Spacer(): JSX.Element {
    return <View style={{height: 25}}></View>;
}

class UserView extends React.Component<UserViewProps> {
    render() {
        const {theme, user, actionBar} = this.props;
        const styles = themedStyles(theme);

        const fullName = user ? user.firstName + " " + user.lastName : "";

        /*const orders = [
            {
                date: new Date(2021, 2, 25),
                products
            }
        ];*/

        return (
            <>
                <WavyHeader style={styles.header} color={theme.accent}>
                    {!user && (
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
                    <Text style={styles.sectionTitle}>Orders:</Text>
                    {/*<ValueCard
                        blank={!profile}
                        label={i18n.t("dateOfBirth")}
                        display={profile ? <FormattedDate style={styles.cardText} date={profile.birthdate} /> : <></>}
                        noModal={true}
                    />*/}
                    <Spacer />
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
        cardText: {
            color: theme.text,
        },
        sectionTitle: {
            fontSize: 20,
        },
    });
});

export default withTheme(UserView);
