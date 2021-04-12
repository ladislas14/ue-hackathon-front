import * as React from "react";
import {connect, ConnectedProps} from "react-redux";
import {withTheme} from "react-native-elements";
import {StackHeaderProps} from "@react-navigation/stack";
import {AppState} from "../../state/types";
import {Theme, ThemeProps} from "../../types";
import {Route} from "@react-navigation/native";
import MainHeader from "./MainHeader";
import {MaterialIcons} from "@expo/vector-icons";
import {preTheme} from "../../styles/utils";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import CartModal from "../modals/CartModal";

// Map props from store
const reduxConnector = connect((state: AppState) => ({
    cart: state.booking.cart,
}));

export type MainHeaderStackProps = Partial<StackHeaderProps> & {route?: Route<string, undefined>};

// Component props
export type MainHeaderProps = ConnectedProps<typeof reduxConnector> &
    ThemeProps &
    MainHeaderStackProps & {title?: string};

type MainHeaderState = {showCart: boolean};

class MainHeaderClient extends React.Component<MainHeaderProps, MainHeaderState> {
    constructor(props: MainHeaderProps) {
        super(props);
        this.state = {showCart: false};
    }

    render(): JSX.Element {
        const {cart, title, theme, ...otherProps} = this.props;
        const {showCart} = this.state;
        const styles = themedStyles(theme);

        return (
            <>
                <MainHeader
                    {...otherProps}
                    overrideTitle={title || ""}
                    backRouteFallback="MainScreenClient"
                    rightButtons={[
                        (props) => (
                            <TouchableOpacity
                                style={props.buttonStyle}
                                onPress={() => this.setState({...this.state, showCart: true})}
                            >
                                <MaterialIcons style={props.iconStyle} name="shopping-cart" />
                                {cart.length > 0 && <Text style={styles.cartNumberStyle}>{cart.length}</Text>}
                            </TouchableOpacity>
                        ),
                    ]}
                />
                <CartModal
                    visible={showCart}
                    onShow={() => this.setState({...this.state, showCart: true})}
                    onHide={() => this.setState({...this.state, showCart: false})}
                />
            </>
        );
    }
}

export const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        cartNumberStyle: {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: theme.error,
            width: 20,
            height: 20,
            borderRadius: 20,
            textAlign: "center",
            color: theme.textWhite,
            fontWeight: "bold",
            opacity: 0.9,
        },
    });
});

export default reduxConnector(withTheme(MainHeaderClient));
