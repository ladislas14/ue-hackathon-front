import * as React from "react";
import {connect, ConnectedProps} from "react-redux";
import {withTheme} from "react-native-elements";
import {StackHeaderProps} from "@react-navigation/stack";
import {AppState} from "../../state/types";
import {Theme, ThemeProps} from "../../types";
import {Route} from "@react-navigation/native";
import MainHeader from "./MainHeader";
import {preTheme} from "../../styles/utils";
import {StyleSheet} from "react-native";

// Map props from store
const reduxConnector = connect((state: AppState) => ({
    cart: state.booking.cart,
}));

export type MainHeaderStackProps = Partial<StackHeaderProps> & {route?: Route<string, undefined>};

// Component props
export type MainHeaderProps = ConnectedProps<typeof reduxConnector> &
    ThemeProps &
    MainHeaderStackProps & {title: string};

class MainHeaderStaff extends React.Component<MainHeaderProps> {
    render(): JSX.Element {
        const {cart, title, theme, ...otherProps} = this.props;
        const styles = themedStyles(theme);

        return <MainHeader {...otherProps} overrideTitle={title} backRouteFallback="MainScreenStaff" />;
    }
}

export const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({});
});

export default reduxConnector(withTheme(MainHeaderStaff));
