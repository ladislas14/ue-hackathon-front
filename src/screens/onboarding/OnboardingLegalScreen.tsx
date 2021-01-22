import * as React from "react";
import {OnboardingScreenProps} from "./OnboardingSlide";
import i18n from "i18n-js";
import OnboardingLegalSlide from "./OnboardingLegalSlide";

class OnboardingLegalScreen extends React.Component<OnboardingScreenProps> {
    render(): JSX.Element {
        return (
            <OnboardingLegalSlide
                title={i18n.t("onboarding.legal.title")}
                text={i18n.t("onboarding.legal.text")}
                {...this.props}
            />
        );
    }
}

export default OnboardingLegalScreen;