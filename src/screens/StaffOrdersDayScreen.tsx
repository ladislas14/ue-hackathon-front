import * as React from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";
import CalendarPicker from "react-native-calendar-picker";

import store from "../state/store";
import {setOrdersDate} from "../state/orders/actions";
import {slideStyles} from "../styles/slides";
import InputLabel from "../components/InputLabel";
import {Moment} from "moment";
import Button from "../components/Button";
import {rootNavigate} from "../navigation/utils";

export type StaffOrdersDayScreenProps = ThemeProps;

class StaffOrdersDayScreen extends React.Component<StaffOrdersDayScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);
        const sstyles = slideStyles(theme);

        return (
            <ScreenWrapper containerStyle={[sstyles.container, styles.container]}>
                <Text style={styles.title}>Commandes</Text>
                <View style={{width: "100%", marginVertical: 50}}>
                    <InputLabel style={{marginBottom: 10}}>Sélectionnez une date</InputLabel>
                    <CalendarPicker
                        width={Dimensions.get("window").width - 30}
                        startFromMonday={true}
                        onDateChange={(date: Moment) => {
                            store.dispatch(setOrdersDate(date.toDate()));
                        }}
                    />
                </View>
                <View style={sstyles.navigation}>
                    <Button
                        style={sstyles.navButton}
                        text="Suivant"
                        onPress={() => rootNavigate("StaffOrdersScreen")}
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
            justifyContent: "center",
        },
        title: {
            width: "100%",
            textAlign: "center",
            fontSize: 26,
            color: theme.text,
        },
    });
});

export default withTheme(StaffOrdersDayScreen);
