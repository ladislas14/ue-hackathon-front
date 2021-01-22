import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect, ConnectedProps} from "react-redux";
import {withTheme} from "react-native-elements";
import ProductsListing from "../components/ProductsListing";
import {FoodProduct} from "../model/products";
import {rootNavigate} from "../navigation/utils";
import {AppState} from "../state/types";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";

// Map props from store
const reduxConnector = connect((state: AppState) => ({
    date: state.availability.date,
}));

export type AvailabilityProductsScreenProps = ThemeProps& ConnectedProps<typeof reduxConnector>;

class AvailabilityProductsScreen extends React.Component<AvailabilityProductsScreenProps> {
    constructor(props: AvailabilityProductsScreenProps) {
        super(props);
        this.state = {activeProduct: null};
    }
    render(): JSX.Element {
        const {theme, date} = this.props;

        const styles = themedStyles(theme);
        return (
            <ScreenWrapper containerStyle={styles.container}>
                <Text style={styles.title}>Disponibilité des produits</Text>
                {date && (
                    <ProductsListing
                        date={date}
                        containerStyle={{flex: 1}}
                    />
                )}
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
            fontSize: 25,
            color: theme.text,
        },
    });
});

export default reduxConnector(withTheme(AvailabilityProductsScreen));
