import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect, ConnectedProps} from "react-redux";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import {AppState} from "../state/types";
import ScreenWrapper from "./ScreenWrapper";
import CalendarPicker from "react-native-calendar-picker";

import store from "../state/store";
import {setAvailabilityDate} from "../state/availability/actions";
import Button from "../components/Button";
import {rootNavigate} from "../navigation/utils";
import {slideStyles} from "../styles/slides";
import {Moment} from "moment";
import InputLabel from "../components/InputLabel";

// Map props from store
const reduxConnector = connect((state: AppState) => ({
    date: state.availability.date,
}));

export type AvailabilityDayScreenProps = ThemeProps & ConnectedProps<typeof reduxConnector>;

type AvailabilityDayScreenState = {calendarWidth: number};

class AvailabilityDayScreen extends React.Component<AvailabilityDayScreenProps, AvailabilityDayScreenState> {
    constructor(props: AvailabilityDayScreenProps) {
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
                <Text style={styles.title}>Configuration de la disponibilité des produits</Text>

                <View
                    style={{width: "100%", height: 380}}
                    onLayout={(layout) =>
                        this.setState({...this.state, calendarWidth: layout.nativeEvent.layout.width})
                    }
                >
                    <InputLabel style={styles.calendarLabel}>Choisissez une date</InputLabel>
                    <CalendarPicker
                        initialDate={date || undefined}
                        selectedDayStyle={{backgroundColor: theme.accent}}
                        selectedDayTextColor={theme.textWhite}
                        startFromMonday={true}
                        width={calendarWidth > 0 ? calendarWidth + 25 : undefined}
                        onDateChange={(m: Moment) => {
                            store.dispatch(setAvailabilityDate(m.toDate()));
                        }}
                    />
                </View>
                <View style={sstyles.navigation}>
                    <Button
                        style={sstyles.navButton}
                        text="Next"
                        onPress={() => rootNavigate("AvailabilityProductsScreen")}
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
            fontSize: 26,
            color: theme.text,
        },
        subtitle: {
            width: "100%",
            fontSize: 22,
            color: theme.text,
            textAlign: "left",
        },
    });
});

export default reduxConnector(withTheme(AvailabilityDayScreen));
