import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";
import CalendarPicker from 'react-native-calendar-picker';

import store from "../state/store";
import {setBookingDate} from "../state/booking/actions";

export type BookingDayScreenProps = ThemeProps;

class BookingDayScreen extends React.Component<BookingDayScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);

        return (
            <ScreenWrapper>
                <Text style={styles.title}>Date de commande des produits</Text>
                <View style={styles.container}>
                    <CalendarPicker
                    style={styles.calendar}
                    onDateChange={(date: Date) => {
                        store.dispatch(setBookingDate(date));
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
            padding: 50,
            alignItems: "center",
            justifyContent: "center",
        },
        calendar: {
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
        },
    });
});

export default withTheme(BookingDayScreen);
