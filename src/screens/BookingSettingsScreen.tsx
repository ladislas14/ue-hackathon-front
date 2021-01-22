import * as React from "react";
import {StyleSheet, View} from "react-native";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";
import {TextInput} from "react-native";
import InputLabel from "../components/InputLabel";
import store from "../state/store";
import {setBookingPickUp, setBookingComment, validateOrder} from "../state/booking/actions";
import Button from "../components/Button";
import {rootNavigate} from "../navigation/utils";
import {slideStyles} from "../styles/slides";
import {MyThunkDispatch} from "../state/types";
import CartDisplay from "../components/CartDisplay";

export type BookingSettingsScreenProps = ThemeProps;

class BookingSettingsScreen extends React.Component<BookingSettingsScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);
        const sstyles = slideStyles(theme);

        return (
            <ScreenWrapper containerStyle={[sstyles.container, styles.container]}>
                <View style={styles.inputContainer}>
                    {/*<Text style={styles.title}>Heure pour venir chercher la commande</Text>
                    <DateTimePicker
                        value={new Date(2019, 1, 2, 12, 0, 0)}
                        mode="time"
                        style={{width: 100, height: 130}}
                        is24Hour={true}
                        display="spinner"
                        onChange={(event, pickUpHour) => {
                            if (pickUpHour) store.dispatch(SetBookingPickUp(pickUpHour));
                        }}
                    />*/}
                </View>

                <View style={styles.inputContainer}>
                    <InputLabel>Panier</InputLabel>
                    <CartDisplay removable={true} />
                </View>

                <View style={[styles.inputContainer, {marginVertical: 50}]}>
                    <InputLabel>Remarques</InputLabel>
                    <TextInput
                        style={styles.remarksInput}
                        numberOfLines={4}
                        multiline={true}
                        onChangeText={(comment: string) => {
                            store.dispatch(setBookingComment(comment));
                        }}
                    />
                </View>
                <View style={sstyles.navigation}>
                    <Button
                        style={sstyles.navButton}
                        text="Retour"
                        onPress={() => rootNavigate("BookingProductsScreen")}
                        skin="rounded-hollow"
                    />
                    <Button
                        style={sstyles.navButton}
                        text="Valider"
                        onPress={() => {
                            (store.dispatch as MyThunkDispatch)(validateOrder());
                        }}
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
            flex: 1,
            width: "100%",
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
        },
        inputContainer: {
            width: "100%",
        },
        title: {
            width: "100%",
            textAlign: "center",
            fontSize: 24,
            color: theme.text,
        },
        remarksInput: {
            width: "100%",
            borderColor: "gray",
            borderWidth: StyleSheet.hairlineWidth,
            textAlignVertical: "top",
            padding: 6,
            marginVertical: 10,
        },
    });
});

export default withTheme(BookingSettingsScreen);
