import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";
import CalendarPicker from 'react-native-calendar-picker';

export type AvailabilityDayScreenProps = ThemeProps;

class AvailabilityDayScreen extends React.Component<AvailabilityDayScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);

        return (
            <ScreenWrapper>
                <Text style={styles.title}>Date de disponibilité des produits</Text>
                <View style={styles.container}>
                    <CalendarPicker
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
        title: {
            width: "100%",
            textAlign: "center",
            paddingTop: 30,
            fontSize: 35,
            color: theme.text,
        },
    });
});

export default withTheme(AvailabilityDayScreen);
