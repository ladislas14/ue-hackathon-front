import {MIN_PASSWORD_LENGTH} from "../validators";

export default {
    en: {
        locales: {
            en: "English",
            fr: "French",
        },
        appName: "Sandw'IMT",
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
        signupWelcome: "Create your account:",
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
        profileType: "Type",
        profileTypes: "Types",
        gender: "Gender",
        genders: {
            male: "Male",
            female: "Female",
            other: "Other",
        },
        roles: {
            client: "Client",
            staff: "Staff",
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
            legal: {
                title: "Terms & Conditions",
                text: "Insert T&C here",
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
            WelcomeScreen: "Welcome",
            SigninScreen: "Login",
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
            BookingScreen: "Booking",
            ProfileScreen: "Profile",
            AvailabilityScreen: "AvailabilityScreen",
            SettingsScreen: "Settings",
            OnboardingSuccessfulScreen: "Successful registration",
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
            version: "Version",
            termsOfService: "Terms of Service",
            reportABug: "Report a Bug",
            logOut: "Log out",
        },
    },
};
