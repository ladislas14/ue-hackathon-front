import {Formik, FormikProps} from "formik";
import * as React from "react";
import OnboardingSlide, {OnboardingScreenProps} from "./OnboardingSlide";
import {AppState} from "../../state/types";
import {connect, ConnectedProps} from "react-redux";
import {setOnboardingValues} from "../../state/auth/actions";
import InputLabel from "../../components/InputLabel";
import {StyleSheet, View} from "react-native";
import {withTheme} from "react-native-elements";
import {ThemeProps} from "../../types";
import {preTheme} from "../../styles/utils";
import RoleToggle from "../../components/RoleToggle";
import Button from "../../components/Button";
import BarCodeModal from "../../components/modals/BarCodeModal";
import {Role} from "../../constants/profile-constants";

const reduxConnector = connect((state: AppState) => ({
    onboardingState: state.auth.onboarding,
}));

type OnboardingStatusScreenProps = ConnectedProps<typeof reduxConnector> & ThemeProps & OnboardingScreenProps;

type OnboardingProfileForm1State = {
    barCode: string | null;
    role: Role | null;
};

class OnboardingStatusScreen extends React.Component<OnboardingStatusScreenProps> {
    submit(values: OnboardingProfileForm1State) {
        if (values.barCode) {
            this.props.next();
            this.props.dispatch(
                setOnboardingValues({
                    barCode: values.barCode,
                    role: values.role,
                }),
            );
        }
    }

    render(): JSX.Element {
        const {onboardingState} = this.props;

        return (
            <Formik
                initialValues={onboardingState as OnboardingProfileForm1State}
                onSubmit={(values: OnboardingProfileForm1State) => this.submit(values)}
            >
                {(formikProps: FormikProps<OnboardingProfileForm1State>) => {
                    const {handleSubmit, values, setFieldValue} = formikProps;

                    return (
                        <OnboardingSlide
                            title="Statut"
                            handleSubmit={handleSubmit}
                            noKeyboardAvoidance={true}
                            {...this.props}
                            hideNavNext={!values.role}
                        >
                            <InputLabel>Carte étudiante</InputLabel>
                            <BarCodeModal
                                activator={(show) => (
                                    <Button
                                        onPress={() => show()}
                                        text={values.barCode ? "Code barre scanné  ✓" : "Scanner"}
                                        skin="rounded-filled"
                                    />
                                )}
                                onScan={(barCode) => setFieldValue("barCode", barCode)}
                            />

                            <Spacer />

                            <InputLabel>Poste</InputLabel>
                            <RoleToggle
                                role={values.role}
                                styleVariant="classic-rounded"
                                onSelect={(role) => {
                                    setFieldValue("role", role);
                                }}
                            />
                        </OnboardingSlide>
                    );
                }}
            </Formik>
        );
    }
}

function Spacer(): JSX.Element {
    return <View style={{width: 1, height: 30}} />;
}

export const themedStyles = preTheme(() => {
    return StyleSheet.create({});
});

export default reduxConnector(withTheme(OnboardingStatusScreen));
