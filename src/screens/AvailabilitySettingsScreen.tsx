import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from 'react-native-calendar-picker';

export type AvailabilitySettingsScreenProps = ThemeProps;

class AvailabilitySettingsScreen extends React.Component<AvailabilitySettingsScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);

        return (
            <ScreenWrapper>
                <View style={styles.container}>
                    <View style={styles.subcontainer}>
                        <Text style={styles.subtitle}>Heure d'ouverture</Text>
                        <DateTimePicker 
                            value={new Date()}
                            mode="time"
                            style={{width: 100, height: 130}}
                            is24Hour={true}
                            display="spinner"
                        />
                    </View>
                    <View style={styles.subcontainer}>
                        <Text style={styles.subtitle}>Heure de fermeture</Text>
                        <DateTimePicker 
                            value={new Date()}
                            mode="time"
                            style={{width: 100, height: 130}}
                            is24Hour={true}
                            display="spinner"
                        />
                    </View>
                </View>
                <View style={styles.subcontainer}>
                    <Text style={styles.subtitle}>Récurrence des réglages</Text>
                    <CalendarPicker
                    allowRangeSelection={true}
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
        subtitle: {
            width: "100%",
            textAlign: "center",
            paddingTop:20,
            fontSize: 14,
            color: theme.text,
        },
    });
});

export default withTheme(AvailabilitySettingsScreen);
