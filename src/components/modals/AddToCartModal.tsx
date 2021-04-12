import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {ThemeProps} from "../../types";
import {withTheme} from "react-native-elements";
import {preTheme} from "../../styles/utils";
import CustomModal, {CustomModalProps} from "./CustomModal";
import Button from "../Button";
import {FoodProduct} from "../../model/products";
import InputSpinner from "react-native-input-spinner";
import store from "../../state/store";
import {addToCart} from "../../state/booking/actions";

export type AddToCartModalProps = ThemeProps & Partial<CustomModalProps> & {product: FoodProduct | null};

type AddToCartModalState = {quantity: number};

class AddToCartModal extends React.Component<AddToCartModalProps, AddToCartModalState> {
    constructor(props: AddToCartModalProps) {
        super(props);
        this.state = {quantity: 1};
    }

    render(): JSX.Element {
        const {theme, product, ...otherProps} = this.props;
        const {quantity} = this.state;
        const styles = themedStyles(theme);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let content = (hide: () => void) => <></>;

        if (product !== null) {
            content = (hide: () => void) => (
                <>
                    <Text style={styles.title}>Ajouter au panier</Text>
                    <View style={styles.quantityContainer}>
                        <InputSpinner
                            max={6}
                            min={0}
                            step={1}
                            colorMax={theme.textLight}
                            colorMin={theme.textLight}
                            color={theme.accent}
                            value={quantity}
                            onChange={(qty: number) => this.setState({...this.state, quantity: qty})}
                        />
                    </View>
                    <View style={styles.actionButtonsWrapper}>
                        <Button
                            text="Cancel"
                            onPress={() => hide()}
                            skin="rounded-hollow"
                            style={styles.actionButton}
                        />
                        <Button
                            text="OK"
                            onPress={() => {
                                hide();
                                store.dispatch(addToCart(product, quantity));
                            }}
                            skin="rounded-filled"
                            style={styles.actionButton}
                        />
                    </View>
                </>
            );
        }

        return (
            <CustomModal
                {...otherProps}
                renderContent={content}
                modalViewStyle={styles.modal}
                onShow={() => {
                    this.setState({...this.state, quantity: 1});
                }}
            />
        );
    }
}

const themedStyles = preTheme(() => {
    return StyleSheet.create({
        modal: {
            paddingHorizontal: 20,
            paddingVertical: 20,
        },
        actionButtonsWrapper: {
            width: "100%",
            flexDirection: "row",
        },
        actionButton: {
            flex: 1,
            marginHorizontal: 5,
            marginVertical: 0,
        },

        title: {
            width: "100%",
            fontSize: 22,
        },
        text: {
            fontSize: 16,
        },

        quantityContainer: {
            flexDirection: "row",
            justifyContent: "center",
            height: 55,
            marginVertical: 20,
        },
    });
});

export default withTheme(AddToCartModal);
