import * as React from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {withTheme} from "react-native-elements";
import {ThemeProps} from "../types";
import {preTheme} from "../styles/utils";

type ScreenWrapperProps = ThemeProps & {containerStyle?: StyleProp<ViewStyle>};

class ScreenWrapper extends React.Component<ScreenWrapperProps> {
    render(): JSX.Element {
        const {theme, containerStyle} = this.props;
        const styles = themedStyles(theme);

        return (
            <View style={styles.wrapper}>
                <View style={[styles.container, containerStyle]}>{this.props.children}</View>
            </View>
        );
    }
}

const themedStyles = preTheme(() => {
    return StyleSheet.create({
        wrapper: {
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
        },
        container: {
            flex: 1,
            alignItems: "center",
        },
    });
});

export default withTheme(ScreenWrapper);
