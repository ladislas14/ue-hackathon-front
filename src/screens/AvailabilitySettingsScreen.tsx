import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";
import DateTimePicker from "@react-native-community/datetimepicker";

import store from "../state/store";
import {setAvailabilityOpeningHours, setAvailabilityClosingHours} from "../state/availability/actions";
import {slideStyles} from "../styles/slides";
import {rootNavigate} from "../navigation/utils";
import Button from "../components/Button";

export type AvailabilitySettingsScreenProps = ThemeProps;

class AvailabilitySettingsScreen extends React.Component<AvailabilitySettingsScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);
        const sstyles = slideStyles(theme);

        return (
            <ScreenWrapper containerStyle={[sstyles.container, styles.container]}>
                <Text style={styles.title}>Paramètres supplémentaires</Text>
                <View style={styles.hoursContainer}>
                    <View style={styles.subcontainer}>
                        <Text style={styles.hourLabel}>Heure d'ouverture</Text>
                        <DateTimePicker
                            value={new Date(2019, 1, 2, 8, 0, 0)}
                            mode="time"
                            style={{width: 100, height: 130}}
                            is24Hour={true}
                            display="spinner"
                            onChange={(event, openingHour) => {
                                if (openingHour) store.dispatch(setAvailabilityOpeningHours(openingHour));
                            }}
                        />
                    </View>
                    <View style={styles.subcontainer}>
                        <Text style={styles.hourLabel}>Heure de fermeture</Text>
                        <DateTimePicker
                            value={new Date(2019, 1, 2, 16, 30, 0)}
                            mode="time"
                            style={{width: 100, height: 130}}
                            is24Hour={true}
                            display="spinner"
                            onChange={(event, closingHour) => {
                                if (closingHour) store.dispatch(setAvailabilityClosingHours(closingHour));
                            }}
                        />
                    </View>
                </View>
                <View style={sstyles.navigation}>
                    <Button
                        style={sstyles.navButton}
                        text="Envoyer"
                        onPress={() => rootNavigate("AvailabilitySettingsScreen")}
                        skin="rounded-filled"
                    />
                </View>
            </ScreenWrapper>
        );
    }
}

const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        container: {
            justifyContent: "space-around",
        },
        hoursContainer: {
            flexDirection: "row",
            width: "100%",
            //justifyContent: "center",
            alignItems: "center",
        },
        subcontainer: {
            flex: 1,
            height: 150,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            width: "100%",
            textAlign: "center",
            paddingTop: 30,
            fontSize: 28,
            color: theme.text,
        },
        hourLabel: {
            width: "100%",
            textAlign: "center",
            maxWidth: 150,
            fontSize: 18,
            color: theme.text,
        },
    });
});

export default withTheme(AvailabilitySettingsScreen);
