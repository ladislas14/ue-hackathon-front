import * as React from "react";
import {StyleSheet, View} from "react-native";
import {connect, ConnectedProps} from "react-redux";
import {withTheme} from "react-native-elements";
import ProductsListing from "../components/ProductsListing";
import {AppState} from "../state/types";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";
import {slideStyles} from "../styles/slides";
import {rootNavigate} from "../navigation/utils";
import Button from "../components/Button";

// Map props from store
const reduxConnector = connect((state: AppState) => ({
    date: state.availability.date,
}));

export type AvailabilityProductsScreenProps = ThemeProps & ConnectedProps<typeof reduxConnector>;

class AvailabilityProductsScreen extends React.Component<AvailabilityProductsScreenProps> {
    constructor(props: AvailabilityProductsScreenProps) {
        super(props);
        this.state = {activeProduct: null};
    }
    render(): JSX.Element {
        const {theme, date} = this.props;

        const styles = themedStyles(theme);
        const sstyles = slideStyles(theme);

        return (
            <ScreenWrapper containerStyle={[sstyles.container, styles.container]}>
                {date && <ProductsListing date={date} containerStyle={styles.productsListing} />}
                <View style={sstyles.navigation}>
                    <Button
                        style={sstyles.navButton}
                        text="Back"
                        onPress={() => rootNavigate("AvailabilityDayScreen")}
                        skin="rounded-hollow"
                    />
                    <Button
                        style={sstyles.navButton}
                        text="Next"
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
            paddingTop: 40,
        },
        title: {
            width: "100%",
            textAlign: "center",
            paddingTop: 30,
            fontSize: 25,
            color: theme.text,
        },
        productsListing: {
            flex: 1,
            marginVertical: 10,
        },
    });
});

export default reduxConnector(withTheme(AvailabilityProductsScreen));
