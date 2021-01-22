import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withTheme} from "react-native-elements";
import Button from "../components/Button";
import {rootNavigate} from "../navigation/utils";
import {slideStyles} from "../styles/slides";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";

export type StaffOrdersScreenProps = ThemeProps;

class StaffOrdersScreen extends React.Component<StaffOrdersScreenProps> {
    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);
        const sstyles = slideStyles(theme);

        return (
            <ScreenWrapper containerStyle={[sstyles.container, styles.container]}>
                <Text style={styles.title}>Inventaire des commandes</Text>
                <View style={sstyles.navigation}>
                    <Button
                        style={sstyles.navButton}
                        text="Back"
                        onPress={() => rootNavigate("StaffOrdersDayScreen")}
                        skin="rounded-hollow"
                    />
                </View>
            </ScreenWrapper>
        );
    }
}

const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        container: {
            justifyContent: "center",
        },
        title: {
            width: "100%",
            textAlign: "center",
            fontSize: 26,
            color: theme.text,
        },
    });
});

export default withTheme(StaffOrdersScreen);
