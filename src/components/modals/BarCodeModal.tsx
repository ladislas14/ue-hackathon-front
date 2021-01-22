import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {ThemeProps} from "../../types";
import {withTheme} from "react-native-elements";
import {preTheme} from "../../styles/utils";
import CustomModal, {CustomModalProps} from "./CustomModal";
import Button from "../Button";
import {BarCodeEvent, BarCodeScanner} from "expo-barcode-scanner";

export type BarCodeModalProps = ThemeProps & Partial<CustomModalProps> & {onScan?: (barCode: string) => void};

class BarCodeModal extends React.Component<BarCodeModalProps> {
    render(): JSX.Element {
        const {theme, onScan, ...otherProps} = this.props;
        const styles = themedStyles(theme);

        return (
            <CustomModal
                {...otherProps}
                renderContent={(hide: () => void) => (
                    <>
                        <Text style={styles.title}>Scannez le code barre au dos de votre carte IMT Atlantique</Text>
                        <View style={styles.scannerContainer}>
                            <BarCodeScanner
                                style={styles.scanner}
                                onBarCodeScanned={(e: BarCodeEvent) => {
                                    hide();
                                    if (onScan) onScan(e.data);
                                }}
                            />
                        </View>
                        <View style={styles.actionButtonsWrapper}>
                            <Button
                                text="Cancel"
                                onPress={() => hide()}
                                skin="rounded-hollow"
                                style={styles.actionButton}
                            />
                        </View>
                    </>
                )}
                modalViewStyle={[styles.modal, otherProps.modalViewStyle]}
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
        title: {
            width: "100%",
            fontSize: 18,
        },
        scannerContainer: {
            width: "100%",
            height: 350,
            marginVertical: 20,
            overflow: "hidden",
        },
        scanner: {
            width: "100%",
            height: "100%",
        },
        actionButtonsWrapper: {
            width: "100%",
        },
        actionButton: {
            marginVertical: 0,
        },
    });
});

export default withTheme(BarCodeModal);
