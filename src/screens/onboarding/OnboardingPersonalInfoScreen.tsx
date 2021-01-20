import {Formik, FormikProps} from "formik";
import * as React from "react";
import OnboardingSlide, {OnboardingScreenProps} from "./OnboardingSlide";
import i18n from "i18n-js";
import * as Yup from "yup";
import {VALIDATOR_ONBOARDING_BIRTHDATE} from "../../validators";
import {AppState} from "../../state/types";
import {connect, ConnectedProps} from "react-redux";
import {setOnboardingValues} from "../../state/auth/actions";
import InputLabel from "../../components/InputLabel";
import InputErrorText from "../../components/InputErrorText";
import {StyleSheet} from "react-native";
import {FormattedDate} from "../../components/FormattedDate";
import BirthDateInput from "../../components/BirthDateInput";
import {withTheme} from "react-native-elements";
import {Theme, ThemeProps} from "../../types";
import {preTheme} from "../../styles/utils";

const reduxConnector = connect((state: AppState) => ({
    onboardingState: state.auth.onboarding,
}));

const VALIDATION_SCHEMA = Yup.object().shape({
    birthdate: VALIDATOR_ONBOARDING_BIRTHDATE,
});

type OnboardingPersonalInfoScreenProps = ConnectedProps<typeof reduxConnector> & ThemeProps & OnboardingScreenProps;

type OnboardingPersonalInfoFormState = {
    birthdate: Date | null;
};

class OnboardingPersonalInfoScreen extends React.Component<OnboardingPersonalInfoScreenProps> {
    shouldComponentUpdate(nextProps: Readonly<OnboardingPersonalInfoScreenProps>) {
        const prev = this.props.onboardingState;
        const next = nextProps.onboardingState;
        return prev.birthdate != next.birthdate;
    }

    submit(values: OnboardingPersonalInfoFormState) {
        if (values.birthdate) {
            this.props.next();
            this.props.dispatch(
                setOnboardingValues({
                    birthdate: values.birthdate,
                }),
            );
        }
    }

    render(): JSX.Element {
        const {onboardingState, theme} = this.props;

        const styles = themedStyles(theme);

        return (
            <Formik
                initialValues={onboardingState as OnboardingPersonalInfoFormState}
                validationSchema={VALIDATION_SCHEMA}
                validateOnChange={true}
                validateOnBlur={false}
                onSubmit={(values: OnboardingPersonalInfoFormState) => this.submit(values)}
            >
                {(formikProps: FormikProps<OnboardingPersonalInfoFormState>) => {
                    const {
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                        setFieldError,
                        setFieldTouched,
                    } = formikProps;

                    return (
                        <OnboardingSlide
                            title={i18n.t("onboarding.personalInfo.title")}
                            handleSubmit={handleSubmit}
                            noKeyboardAvoidance={true}
                            {...this.props}
                        >
                            <InputLabel>{i18n.t("dateOfBirth")}</InputLabel>
                            <BirthDateInput
                                inputStyle={styles.dateTextInput}
                                inputStyleValid={styles.dateTextInputValid}
                                onChange={(date, error) => {
                                    if (error) setFieldError("birthdate", error);
                                    else setFieldValue("birthdate", date);
                                    setFieldTouched("birthdate", true);
                                }}
                            />
                            {values.birthdate && !errors.birthdate && (
                                <FormattedDate style={styles.birthdateText} date={values.birthdate} />
                            )}
                            {touched.birthdate && <InputErrorText error={errors.birthdate}></InputErrorText>}
                        </OnboardingSlide>
                    );
                }}
            </Formik>
        );
    }
}

export const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        dateTextInput: {
            height: 44,
            borderRadius: 0,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.accentTernary,
            backgroundColor: "transparent",
            fontSize: 18,
            color: theme.text,
        },
        dateTextInputValid: {
            borderBottomColor: theme.okay,
        },
        birthdateText: {
            textAlign: "right",
            marginTop: 4,
            fontSize: 12,
        },
    });
});

export default reduxConnector(withTheme(OnboardingPersonalInfoScreen));
