import * as React from "react";
import {StyleSheet, View} from "react-native";
import {withTheme} from "react-native-elements";
import {connect, ConnectedProps} from "react-redux";
import Button from "../components/Button";
import AddToCardModal from "../components/modals/AddToCartModal";
import ProductsListing from "../components/ProductsListing";
import {FoodProduct} from "../model/products";
import {rootNavigate} from "../navigation/utils";
import {AppState} from "../state/types";
import {slideStyles} from "../styles/slides";
import {preTheme} from "../styles/utils";
import {ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";

// Map props from store
const reduxConnector = connect((state: AppState) => ({
    date: state.booking.date,
    cart: state.booking.cart,
}));

export type BookingProductsScreenProps = ThemeProps & ConnectedProps<typeof reduxConnector>;

type BookingProductsScreenState = {activeProduct: FoodProduct | null};

class BookingProductsScreen extends React.Component<BookingProductsScreenProps, BookingProductsScreenState> {
    constructor(props: BookingProductsScreenProps) {
        super(props);
        this.state = {activeProduct: null};
    }

    render(): JSX.Element {
        const {theme, date, cart} = this.props;
        const {activeProduct} = this.state;

        const styles = themedStyles(theme);
        const sstyles = slideStyles(theme);

        return (
            <ScreenWrapper containerStyle={[sstyles.container, styles.container]}>
                <AddToCardModal
                    product={activeProduct}
                    visible={activeProduct !== null}
                    onHide={() => this.setState({...this.state, activeProduct: null})}
                />
                {date && (
                    <ProductsListing
                        date={date}
                        isStaff={false}
                        containerStyle={styles.productsListing}
                        onClickItem={(item: FoodProduct) => {
                            this.setState({...this.state, activeProduct: item});
                        }}
                        highlightedItems={cart.map((f) => f.product.id)}
                    />
                )}
                <View style={sstyles.navigation}>
                    <Button
                        style={sstyles.navButton}
                        text="Retour"
                        onPress={() => rootNavigate("BookingDayScreen")}
                        skin="rounded-hollow"
                    />
                    <Button
                        style={sstyles.navButton}
                        text="Suivant"
                        onPress={() => rootNavigate("BookingSettingsScreen")}
                        skin="rounded-filled"
                    />
                </View>
            </ScreenWrapper>
        );
    }
}

const themedStyles = preTheme(() => {
    return StyleSheet.create({
        container: {
            paddingHorizontal: 8,
        },
        productsListing: {
            width: "100%",
            flex: 1,
        },
    });
});

export default reduxConnector(withTheme(BookingProductsScreen));
