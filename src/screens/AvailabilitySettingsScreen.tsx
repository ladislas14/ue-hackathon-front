import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from 'react-native-calendar-picker';

import store from "../state/store";
import {setAvailabilityOpeningHours, setAvailabilityClosingHours} from "../state/availability/actions";

export type AvailabilitySettingsScreenProps = ThemeProps;

class AvailabilitySettingsScreen extends React.Component<AvailabilitySettingsScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);

        return (
            <ScreenWrapper>
                <Text style={styles.title}>Horaires de la cafétéria</Text>
                <View style={styles.container}>
                    <View style={styles.subcontainer}>
                        <Text style={styles.subtitle}>Heure d'ouverture</Text>
                        <DateTimePicker 
                            value={new Date(2019,1,2, 8,0,0)}
                            mode="time"
                            style={{width: 100, height: 130}}
                            is24Hour={true}
                            display="spinner"
                            onChange={(event, openingHour) => {
                                store.dispatch(setAvailabilityOpeningHours(openingHour));
                            }}
                        />
                    </View>
                    <View style={styles.subcontainer}>
                        <Text style={styles.subtitle}>Heure de fermeture</Text>
                        <DateTimePicker 
                            value={new Date(2019,1,2, 16,30,0)}
                            mode="time"
                            style={{width: 100, height: 130}}
                            is24Hour={true}
                            display="spinner"
                            onChange={(event, closingHour) => {
                                store.dispatch(setAvailabilityClosingHours(closingHour));
                            }}
                        />
                    </View>
                </View>
            </ScreenWrapper>
        );
    }
}

const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            width: "100%",
            height: 150,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        subcontainer: {
            flex: 1,
            width: "100%",
            height: 150,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            width: "100%",
            textAlign: "center",
            paddingTop:30,
            fontSize: 35,
            color: theme.text,
        },
        subtitle: {
            width: "100%",
            textAlign: "center",
            paddingTop:0,
            fontSize: 18,
            color: theme.text,
        },
    });
});

export default withTheme(AvailabilitySettingsScreen);
