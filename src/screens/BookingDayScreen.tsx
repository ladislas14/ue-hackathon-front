import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";
import CalendarPicker from "react-native-calendar-picker";
import store from "../state/store";
import {setBookingDate} from "../state/booking/actions";
import {Moment} from "moment";
import InputLabel from "../components/InputLabel";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../state/types";
import Button from "../components/Button";
import { slideStyles } from "../styles/slides";
import { rootNavigate } from "../navigation/utils";

// Map props from store
const reduxConnector = connect((state: AppState) => ({
    date: state.booking.date,
}));

export type BookingDayScreenProps = ThemeProps & ConnectedProps<typeof reduxConnector>;

type BookingDayScreenState = {calendarWidth: number};

class BookingDayScreen extends React.Component<BookingDayScreenProps, BookingDayScreenState> {
    constructor(props: BookingDayScreenProps) {
        super(props);
        this.state = {calendarWidth: 0};
    }

    render(): JSX.Element {
        const {theme, date} = this.props;
        const {calendarWidth} = this.state;
        const styles = themedStyles(theme);
        const sstyles = slideStyles(theme);

        return (
            <ScreenWrapper containerStyle={[sstyles.container, styles.container]}>
                <Text style={styles.title}>Réserver une commande</Text>
                <View
                    style={{width: "100%", height: 380}}
                    onLayout={(layout) =>
                        this.setState({...this.state, calendarWidth: layout.nativeEvent.layout.width})
                    }
                >
                    <InputLabel style={styles.calendarLabel}>Choisissez une date</InputLabel>
                    <CalendarPicker
                        minDate={new Date()}
                        initialDate={date || undefined}
                        selectedDayStyle={{backgroundColor: theme.accent}}
                        selectedDayTextColor={theme.textWhite}
                        startFromMonday={true}
                        width={calendarWidth > 0 ? calendarWidth + 25 : undefined}
                        onDateChange={(m: Moment) => {
                            store.dispatch(setBookingDate(m.toDate()));
                        }}
                    />
                </View>
                <View style={sstyles.navigation}>
                    <Button
                        style={sstyles.navButton}
                        text="Suivant"
                        onPress={() => rootNavigate("BookingProductsScreen")}
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
            paddingTop: 80,
            paddingBottom: 60,
            justifyContent: "space-between",
        },
        calendarLabel: {
            marginVertical: 20,
        },
        title: {
            width: "100%",
            textAlign: "center",
            fontSize: 24,
            color: theme.text,
        },
    });
});

export default reduxConnector(withTheme(BookingDayScreen));
