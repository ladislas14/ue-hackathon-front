import {MaterialIcons} from "@expo/vector-icons";
import * as React from "react";
import {ScrollView, StyleProp, Text, View, ViewStyle, StyleSheet, TouchableOpacity} from "react-native";
import {withTheme} from "react-native-elements";
import {connect, ConnectedProps} from "react-redux";
import {FoodProduct} from "../model/products";
import {removeFromCart} from "../state/booking/actions";
import store from "../state/store";
import {AppState} from "../state/types";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";

// Map props from store
const reduxConnector = connect((state: AppState) => ({
    cart: state.booking.cart,
}));

// Component props
export type CartDisplayProps = {
    removable?: boolean;
    scrollStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
} & ConnectedProps<typeof reduxConnector> &
    ThemeProps;

class CartDisplay extends React.Component<CartDisplayProps> {
    render(): JSX.Element {
        const {removable, scrollStyle, contentStyle, cart, theme} = this.props;
        const styles = themedStyles(theme);

        return (
            <ScrollView style={[styles.scroll, scrollStyle]} contentContainerStyle={[styles.content, contentStyle]}>
                {cart.length === 0 && <Text style={styles.emptyCart}>Votre panier est vide.</Text>}
                {cart.map(({product, quantity}: {product: FoodProduct; quantity: number}, i: number) => (
                    <Item
                        key={`CartDisplay-${i}-${product.id}`}
                        product={product}
                        quantity={quantity}
                        removable={removable}
                        onRemove={() => {
                            store.dispatch(removeFromCart(product.id));
                        }}
                        //textStyle={textStyle}
                    />
                ))}
            </ScrollView>
        );
    }
}

type ItemProps = {
    product: FoodProduct;
    quantity: number;
    removable?: boolean;
    onRemove?: () => void;
} & ThemeProps;

const Item = withTheme(
    ({product, quantity, removable, onRemove, theme}: ItemProps): JSX.Element => {
        const styles = themedStyles(theme);
        return (
            <View style={[styles.item]}>
                <Text style={[styles.itemName]} numberOfLines={1}>
                    {product.name}
                </Text>
                <View style={styles.itemRight}>
                    <Text style={styles.itemQuantity}>×{quantity}</Text>
                    {removable && (
                        <TouchableOpacity
                            style={styles.itemRemoveButton}
                            onPress={() => {
                                if (onRemove) onRemove();
                            }}
                        >
                            <MaterialIcons name="close" style={styles.itemRemoveIcon} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    },
);

export const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        scroll: {
            maxHeight: 250,
            marginVertical: 10,
        },
        content: {
            alignItems: "flex-start",
            width: "100%",
        },
        item: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingVertical: 6,
            paddingHorizontal: 10,
            marginBottom: 4,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: "gray",
        },
        itemName: {
            fontSize: 14,
            color: theme.textBlack,
            flex: 1,
        },
        itemRight: {
            flexDirection: "row",
            alignItems: "center",
        },
        itemQuantity: {
            fontSize: 16,
            color: theme.text,
            marginHorizontal: 5,
        },
        itemRemoveButton: {
            width: 32,
            height: 32,
            alignItems: "center",
            justifyContent: "center",
        },
        itemRemoveIcon: {
            fontSize: 22,
            color: theme.textBlack,
        },
        emptyCart: {
            fontSize: 14,
        },
    });
});

export default reduxConnector(withTheme(CartDisplay));
