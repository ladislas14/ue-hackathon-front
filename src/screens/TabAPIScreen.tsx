import * as React from "react";
import {Button, StyleSheet, View} from "react-native";
import {withTheme} from "react-native-elements";
import {requestTrefle} from "../api/trefle";
import {TreflePaginatedResponse, TreflePlantDto} from "../api/trefle/dto";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import ScreenWrapper from "./ScreenWrapper";

export type TabAPIScreenProps = ThemeProps;

let numPages = 0;

class TabAPIScreen extends React.Component<TabAPIScreenProps> {
    async requestRandomPlant() {
        // First find out how many pages there are if we don't know yet
        if (numPages === 0) {
            await requestTrefle("plants", "GET").then((resp) => {
                const response = resp as TreflePaginatedResponse;
                numPages = parseInt(response.links.last.split("page=")[1]);
                console.log(`There are ${numPages} pages of plants.`);
            });
        }

        // Get a random plant from a random page
        requestTrefle("plants", "GET", {
            page: Math.floor(Math.random() * numPages),
        }).then((resp) => {
            const response = resp as TreflePaginatedResponse<TreflePlantDto>;
            const plant = response.data[Math.floor(Math.random() * response.data.length)];
            console.log(plant);
        });
    }

    render(): JSX.Element {
        const {theme} = this.props;
        const styles = themedStyles(theme);

        return (
            <ScreenWrapper>
                <View style={styles.container}>
                    <Button title="Test Trefle API" onPress={() => this.requestRandomPlant()} />
                </View>
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
        icon: {
            color: theme.accent,
            fontSize: 48,
            paddingBottom: 20,
        },
    });
});

export default withTheme(TabAPIScreen);
