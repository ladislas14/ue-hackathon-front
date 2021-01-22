import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {TextInput} from "react-native";
import InputLabel from "../components/InputLabel";

import store from "../state/store";
import {SetBookingPickUp, SetBookingComment} from "../state/booking/actions";

export type BookingSettingsScreenProps = ThemeProps;

class BookingSettingsScreen extends React.Component<BookingSettingsScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);

        return (
            <ScreenWrapper>
                <View style={styles.container}>
                    <Text style={styles.title}>Heure pour venir chercher la commande</Text>
                    <DateTimePicker
                        value={new Date(2019, 1, 2, 12, 0, 0)}
                        mode="time"
                        style={{width: 100, height: 130}}
                        is24Hour={true}
                        display="spinner"
                        onChange={(event, pickUpHour) => {
                            if (pickUpHour) store.dispatch(SetBookingPickUp(pickUpHour));
                        }}
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Remarque</Text>
                    <TextInput
                        style={{width: "100%", height: 100, borderColor: "gray", borderWidth: 1}}
                        onChangeText={(comment: string) => {
                            store.dispatch(SetBookingComment(comment));
                        }}
                    />
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
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            width: "100%",
            textAlign: "center",
            fontSize: 24,
            color: theme.text,
        },
    });
});

export default withTheme(BookingSettingsScreen);
