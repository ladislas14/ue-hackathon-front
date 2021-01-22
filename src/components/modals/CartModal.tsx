import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {ThemeProps} from "../../types";
import {withTheme} from "react-native-elements";
import {preTheme} from "../../styles/utils";
import CustomModal, {CustomModalProps} from "./CustomModal";
import CartDisplay from "../CartDisplay";
import Button from "../Button";

export type CartModalProps = ThemeProps & Partial<CustomModalProps>;

class CartModal extends React.Component<CartModalProps> {
    render(): JSX.Element {
        const {theme, ...otherProps} = this.props;
        const styles = themedStyles(theme);

        return (
            <CustomModal
                {...otherProps}
                renderContent={(hide: () => void) => (
                    <>
                        <Text style={styles.title}>Mon panier :</Text>
                        <CartDisplay scrollStyle={styles.cartScroll} removable={true} />
                        <View style={styles.actionButtonsWrapper}>
                            <Button
                                text="OK"
                                onPress={() => {
                                    hide();
                                }}
                                skin="rounded-filled"
                                style={styles.actionButton}
                            />
                        </View>
                    </>
                )}
                modalViewStyle={styles.modal}
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
            marginVertical: 0,
        },
        title: {
            width: "100%",
            fontSize: 22,
        },
        cartScroll: {
            marginVertical: 30,
        },
    });
});

export default withTheme(CartModal);
