import * as React from "react";
import {View, StyleSheet, StyleProp, ViewStyle} from "react-native";
import {withTheme} from "react-native-elements";
import {preTheme} from "../styles/utils";
import {Theme, ThemeProps} from "../types";
import {ONBOARDING_ORDER} from "../screens/onboarding";
import ReAnimated, {Easing} from "react-native-reanimated";

export type OnboardingProgressBarProps = {
    index: number;
    style?: StyleProp<ViewStyle>;
    foregroundStyle?: StyleProp<ViewStyle>;
} & ThemeProps;

class OnboardingProgressBar extends React.Component<OnboardingProgressBarProps> {
    containerWidth = 0;
    width = new ReAnimated.Value<number>(0);

    componentDidMount() {
        this.setIndex(this.props.index);
    }

    componentDidUpdate(oldProps: OnboardingProgressBarProps): void {
        const {index} = this.props;
        if (oldProps.index !== index) this.setIndex(index);
    }

    private setIndex(index: number) {
        const progress = (index + 1) / ONBOARDING_ORDER.length;
        const targetWidth = progress * this.containerWidth;

        ReAnimated.timing(this.width, {
            toValue: targetWidth,
            duration: 150,
            easing: Easing.sin,
        }).start();
    }

    render(): JSX.Element {
        const {style, foregroundStyle, theme} = this.props;
        const styles = themedStyles(theme);

        return (
            <View
                style={[styles.background, style]}
                onLayout={(layout) => {
                    this.containerWidth = layout.nativeEvent.layout.width;
                    this.setIndex(this.props.index);
                }}
            >
                <ReAnimated.View style={[styles.foreground, {width: this.width}, foregroundStyle]} />
            </View>
        );
    }
}

export const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        background: {
            width: "100%",
            height: 12,
            backgroundColor: theme.accentSlight,
        },
        foreground: {
            backgroundColor: theme.accent,
            height: "100%",
        },
    });
});

export default withTheme(OnboardingProgressBar);
