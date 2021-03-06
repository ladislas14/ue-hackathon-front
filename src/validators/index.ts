import * as Yup from "yup";

export const MIN_PASSWORD_LENGTH = 8;

export const VALIDATOR_EMAIL_SIGNUP = Yup.string().required("validation.required").email("validation.email.invalid");

export const VALIDATOR_PASSWORD_SIGNUP = Yup.string()
    .required("validation.required")
    .min(MIN_PASSWORD_LENGTH, "validation.password.tooShort")
    // At least one digit
    .matches(/(?=.*\d)/, "validation.password.noDigit")
    // At least one lower-case character
    .matches(/(?=.*[a-z])/, "validation.password.noLowerCase")
    // At least one upper-case character
    .matches(/(?=.*[A-Z])/, "validation.password.noUpperCase")
    // At least one symbol
    .matches(/(?=.*[#@$!%*?&])/, "validation.password.noSymbol");

export const VALIDATOR_PASSWORD_REPEAT = Yup.string()
    .required("validation.required")
    .oneOf([Yup.ref("password")], "validation.password.repeatWrong");

export const VALIDATOR_EMAIL_LOGIN = Yup.string().required("validation.required").email("validation.email.invalid");
export const VALIDATOR_PASSWORD_LOGIN = Yup.string().required("validation.required");

export const VALIDATOR_FIRSTNAME = Yup.string().trim().required("validation.required");

export const VALIDATOR_LASTNAME = Yup.string().trim().required("validation.required");

export const VALIDATOR_ONBOARDING_BIRTHDATE = Yup.date().nullable().required("validation.required"); // make it nullable so we can use null to represent a non given value (will fail the 'required' test anyway)
