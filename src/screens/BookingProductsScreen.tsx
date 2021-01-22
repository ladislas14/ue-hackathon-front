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
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";

// Map props from store
const reduxConnector = connect((state: AppState) => ({
    date: state.booking.date,
}));

export type BookingProductsScreenProps = ThemeProps & ConnectedProps<typeof reduxConnector>;

type BookingProductsScreenState = {activeProduct: FoodProduct | null};

class BookingProductsScreen extends React.Component<BookingProductsScreenProps, BookingProductsScreenState> {
    constructor(props: BookingProductsScreenProps) {
        super(props);
        this.state = {activeProduct: null};
    }

    render(): JSX.Element {
        const {theme, date} = this.props;
        const {activeProduct} = this.state;

        const styles = themedStyles(theme);
        const sstyles = slideStyles(theme);

        return (
            <ScreenWrapper containerStyle={sstyles.container}>
                <AddToCardModal
                    product={activeProduct}
                    visible={activeProduct !== null}
                    onHide={() => this.setState({...this.state, activeProduct: null})}
                />
                {date && (
                    <ProductsListing
                        date={date}
                        containerStyle={{flex: 1}}
                        onClickItem={(item: FoodProduct) => {
                            this.setState({...this.state, activeProduct: item});
                        }}
                    />
                )}
                <View style={sstyles.navigation}>
                    <Button
                        style={sstyles.navButton}
                        text="Back"
                        onPress={() => rootNavigate("BookingDayScreen")}
                        skin="rounded-hollow"
                    />
                    <Button
                        style={sstyles.navButton}
                        text="Next"
                        onPress={() => rootNavigate("BookingSettingsScreen")}
                        skin="rounded-filled"
                    />
                </View>
            </ScreenWrapper>
        );
    }
}

const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({});
});

export default reduxConnector(withTheme(BookingProductsScreen));
