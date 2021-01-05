import {MIN_PASSWORD_LENGTH} from "../validators";

export default {
    en: {
        locales: {
            en: "English",
            fr: "French",
        },
        appName: "Hackathon",
        welcome: "Welcome",
        // Component-related
        picker: {
            callToAction: "Select (%d selected)",
        },
        login: "Log in",
        emailAddress: "Email address",
        password: "Password",
        passwordRepeat: "Repeat password",
        send: "Send",
        forgotPassword: "Forgot Password",
        newPassword: "New Password",
        forgotPasswordExplanation:
            "Enter the email address associated with your account below. Instructions for choosing a new password will be sent shortly.",
        cancel: "Cancel",
        ok: "OK",
        signupWelcome: "We can't wait for you to join our community!",
        save: "Save",
        firstname: "First name",
        lastname: "Last name",
        noResultsFound: "No results found",
        apply: "Apply",
        logOut: "Log out",
        legal: {
            modal: {
                disclaimer1:
                    "Please understand that you will not be able to use our services if you decide to decline the terms of service.",
                disclaimer2: "Declining will abort the profile creation process.",
            },
            decline: "Decline",
            accept: "Accept",
            readMore: ["Read more about our terms & conditions ", "here", "."],
        },
        privacy: {
            readMore: ["Read more about our privacy policy ", "here", "."],
        },
        emailNotificationsLabel: "Send me useful notifications by email.",
        emailValidation: {
            validating: "Validating",
            success: ["Your account has been validated! You may now ", "log in"],
        },
        createAccount: "Create account",
        validation: {
            required: "Required field.",
            atLeastOne: "Please select at least one.",
            addAtLeastOne: "Please add at least one.",
            email: {
                invalid: "Please provide a valid email address.",
                invalidDomain: "Your email address must match one of our partner universities.",
            },
            password: {
                tooShort: `Your password must have at least ${MIN_PASSWORD_LENGTH} characters.`,
                noDigit: "Your password must contain at least one digit.",
                noUpperCase: "Your password must contain at least one upper case character.",
                noLowerCase: "Your password must contain at least one lower case character.",
                noSymbol: "Your password must contain at least one symbol (#@$!%*?&).",
                repeatWrong: "These passwords don't match.",
            },
            language: {
                atLeastOne: "Please select at least one language.",
                specifyLevel: "Please specify a level for your languages.",
            },
            date: {
                tooYoung: "You must be 16 or older to join this platform.",
                invalid: "Please enter a valid date.",
            },
        },
        error: {
            error_user_not_verified: "This account's email address has not been verified yet.",
            user_not_found: "User not found.",
            email_or_password_incorrect: "Incorrect email or password.",
            reset_password_no_token: "Could not fulfill this request.",
            unique: {
                user: {
                    email: "This email address is already in use.",
                },
            },
            validation: {
                email: {
                    is_email: "Please provide a valid email address.",
                },
            },
        },
        tabs: {
            home: "Home",
            matching: "Matching",
            messaging: "Messaging",
            notifications: "Notifications",
        },
        search: "Search",
        // General translations related to the profile
        myProfile: "My Profile",
        editProfile: "Edit profile",
        nationality: "Nationality",
        university: "University",
        selectCountry: "Select country",
        countryPickerLanguageCode: "common", // see TranslationLanguageCode from react-native-country-picker-modal
        profileType: "Type",
        profileTypes: "Types",
        gender: "Gender",
        genders: {
            male: "Male",
            female: "Female",
            other: "Other",
        },
        dateOfBirth: "Date of birth",
        months: {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December",
        },
        // 404 not found screen
        notFoundScreen: {
            title: "404: Page not found.",
            subtitle: "This page doesn't exist.",
            redirect: "Go to home screen",
        },
        // On-boarding slides
        onboarding: {
            name: {
                title: "Welcome",
                subtitle:
                    "Before we start, we need to know a little bit more about you to ensure the best possible recommendations.",
            },
            personalInfo: {
                title: "Profile",
            },
            language: {
                title: "Languages",
            },
            interests: {
                title: "Interests",
            },
            role: {
                title: "I am a...",
            },
            roleSpecific1: {
                student: {
                    title: "Student information",
                },
                staff: {
                    title: "Staff roles",
                },
            },
            legal1: {
                title: "Terms & Conditions",
                text:
                    "As explained in details in our Terms & Conditions, you agree to use «SEA-EU Around» and its services only to be put into contact, on a non-business and non-profit basis, with people wishing to meet, collaborate and interact online or in the frame of a mobility. You commit to carry out respectful exchanges with other members. Your name and surname will be visible by other members.",
            },
            legal2: {
                title: "Data Policy",
                text:
                    "In the context of your use of SEA-EU Around, you will provide some personal data to create your profile as further explained in our Terms & Conditions. This data is collected and processed by UBO through SEA-EU Around in order to enable matching among Members, according to needs/offers and interests defined by Members of SEA-EU Around. Your data will be visible only by  other Members.",
            },
            legal3: {
                title: "Cookies",
                text:
                    "I acknowledge that cookies might be used. The information is kept only for application purposes and does not permit to identify the Member except for the cookie enabling UBO to re-authenticate the Member on its arrival on SEA-EU Around, saving the Member from having to re-enter their password at each connection.",
            },
            submit: "Submit",
            getStarted: "Get Started",
            profileCreated: "Welcome! Your profile is now created.",
            quit: {
                title: "Quit on-boarding",
                text: "Do you really wish to leave? You can resume later.",
                cancel: "Cancel",
                yes: "Yes",
            },
        },
        // Block modal
        block: {
            warning:
                "Are you sure you want to block this user? You and {{firstname}} will not be able to find each other anymore.",
            action: "Block",
        },
        // Welcome screen
        welcomeScreen: {
            signIn: "Log in",
            signUp: "Sign up",
            subtitle: "This project is being developed for the Hackathon learning unit at IMT Atlantique (2021).",
        },
        // Login
        loginForm: {
            title: "Welcome Back!",
            logIn: "Log in",
            signUp: "Sign up",
            or: "or",
        },
        // Report
        report: {
            title: "Report",
            send: "Send",
            cancel: "Cancel",
            what: "What / who?",
            why: "Why?",
            typePlaceholder: "Select a reason",
            types: {
                violence: "Violence",
                nudity: "Nudity",
                harassment: "Harassment",
                "undesirable-content": "Undesirable content",
                "hate-speech": "Hate speech",
                "vulgar-content": "Vulgar content",
                other: "Other",
            },
            confirmationTitle: "Thank you",
            confirmation: "An administrator will investigate your report shortly.",
            failureTitle: "Sorry",
            failure: "We are unable to fulfill your request.",
        },
        // Reset password
        resetPassword: {
            instructions: "To choose a new password, click the link in the email we just sent you.",
            title: "Please choose a new password",
            button: "Send",
            success: "Your password has been updated.",
        },
        // Delete account
        deleteAccount: {
            title: "Delete your account",
            warning:
                "Your account and all associated data will be deleted within six months. Please be aware that after this time, your account will be irreversibly deleted. If you sign in during this month however, the deletion will be cancelled.",
            button: "Delete",
            success1: "Your request has been received and will be processed shortly.",
            success2: "We are sorry to see you go.",
            leave: "Leave",
            inputLabel: "Enter password to confirm",
        },
        // Messaging tab
        messaging: {
            noMatches: "It appears that you haven't matched with anyone yet. :(",
        },
        // Matching tab
        matching: {
            noResults: "No results found",
            noResultsAdvice: "Perhaps try removing some filters",
            filtering: {
                sectionGeneral: "General",
                buttonReset: "Reset",
            },
            actionLike: "Like",
            actionHide: "Hide",
            success: {
                title: "It's a match !",
                chat: "Start chatting",
                continue: "Keep scrolling",
            },
            history: {
                status: {
                    requested: "Liked",
                    declined: "Hidden",
                    blocked: "Blocked",
                },
                actions: {
                    report: "Report",
                    cancel: {
                        requested: "Cancel like",
                        declined: "Cancel hide",
                        blocked: "Cancel block",
                    },
                    block: "Block",
                },
                noResults: "No results found",
                noResultsAdvice: "Perhaps try removing some filters",
            },
        },
        // Profile tab
        profile: {
            action: {
                chat: "Chat",
                mute: "Mute",
                block: "Block",
                unmatch: "Unmatch",
                report: "Report",
            },
            noOffersSelected: "No offers selected.",
        },
        screenTitles: {
            suffix: " - SEA-EU Around",
            WelcomeScreen: "Welcome",
            SigninScreen: "Login",
            ForgotPasswordScreen: "Forgot Password",
            SignupScreen: "Sign up",
            OnboardingNameScreen: "Welcome",
            OnboardingPersonalInfoScreen: "Profile",
            OnboardingLanguageScreen: "Profile",
            OnboardingInterestsScreen: "Profile",
            OnboardingRoleScreen: "Profile",
            OnboardingRoleSpecificScreen: "Profile",
            OnboardingOffersScreen1: "Discover",
            OnboardingOffersScreen2: "Collaborate",
            OnboardingOffersScreen3: "Meet",
            OnboardingLegalScreen1: "Terms & Conditions",
            OnboardingPrivacyScreen: "Privacy Policy",
            ChatRoomsScreen: "Messages",
            ChatScreen: "Chat",
            TabHomeScreen: "Home",
            TabMatchingScreen: "Match",
            MatchFilteringScreen: "Filters",
            MatchHistoryScreen: "History",
            TabNotificationsScreen: "Notifications",
            MyProfileScreen: "Profile",
            ProfileScreen: "Profile",
            SettingsScreen: "Settings",
            DeleteAccountScreen: "Delete Account",
            DeleteAccountSuccessScreen: "Account Deleted",
            ValidationEmailSentScreen: "Validate your account",
            ValidateEmailScreen: "Validate your account",
            ResetPasswordScreen: "Reset your password",
            ResetPasswordSuccessScreen: "Password reset",
            OnboardingSuccessfulScreen: "Successful registration",
            NotFoundScreen: "Not Found",
            MatchSuccessScreen: "Match!",
            ForgotPasswordEmailSentScreen: "Forgot password",
        },
        // Settings screen
        settings: {
            sections: {
                general: "General",
                danger: "Danger zone",
                about: "About",
            },
            language: "Language",
            darkTheme: "Dark theme",
            deleteAccount: "Delete Account",
            deleteMyAccount: "Delete my account",
            version: "Version",
            termsOfService: "Terms of Service",
            reportABug: "Report a Bug",
            logOut: "Log out",
        },
    },
};
