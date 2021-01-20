import * as React from "react";
import {ActivityIndicator, Text, View} from "react-native";
import i18n from "i18n-js";
import {withTheme} from "react-native-elements";
import {StyleSheet} from "react-native";
import AvatarEditButton from "../AvatarEditButton";
import ValueCard from "../cards/ValueCard";
import {FormattedDate} from "../FormattedDate";
import {UserProfile} from "../../model/user-profile";
import {User} from "../../model/user";
import {Theme, ThemeProps} from "../../types";
import {preTheme} from "../../styles/utils";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import store from "../../state/store";
import {MyThunkDispatch} from "../../state/types";
import {setAvatar} from "../../state/profile/actions";
import EnlargeableAvatar from "../EnlargeableAvatar";
import WavyHeader from "../headers/WavyHeader";
import BirthDateInput, {BirthDateInputClass} from "../BirthDateInput";
import ScrollFormWrapper from "./ScrollFormWrapper";

// Component props
export type EditProfileFormProps = ThemeProps & {
    user: User | null;
    onChange?: (fields: Partial<UserProfile>) => void;
};

function Spacer(): JSX.Element {
    return <View style={{height: 25}}></View>;
}

class EditProfileForm extends React.Component<EditProfileFormProps> {
    birthDateInputRef = React.createRef<BirthDateInputClass>();

    onFieldChanged(fields: Partial<UserProfile>): void {
        if (this.props.onChange !== undefined) this.props.onChange(fields);
    }

    render() {
        const {theme, user} = this.props;
        const styles = themedStyles(theme);

        const fullName = user && user.profile ? user.profile.firstName + " " + user.profile.lastName : "";

        const profile = user?.profile;

        const profileFieldComponents = (
            <>
                <ValueCard
                    blank={!user}
                    label={i18n.t("emailAddress")}
                    initialValue={user?.email}
                    display={(user && <Text style={styles.cardText}>{user.email}</Text>) || undefined}
                    locked={true}
                />
                <Spacer />
                <ValueCard
                    blank={!user}
                    label={i18n.t("dateOfBirth")}
                    initialValue={profile?.birthdate}
                    display={profile && <FormattedDate style={styles.cardText} date={profile.birthdate} />}
                    renderInput={(value: Date, _error, onChange) => (
                        <BirthDateInput
                            ref={this.birthDateInputRef}
                            date={value}
                            containerStyle={styles.birthdateInputContainer}
                            inputStyle={styles.birthdateInput}
                            onChange={(birthdate?: Date, inputError?: string) => {
                                onChange(birthdate || value, inputError || null);
                            }}
                        />
                    )}
                    onModalShown={() => this.birthDateInputRef.current?.focus()}
                    apply={(birthdate: Date) => this.onFieldChanged({birthdate})}
                />
                <Spacer />
            </>
        );

        return (
            <>
                <WavyHeader style={styles.header} color={theme.accent}>
                    <EnlargeableAvatar
                        profile={user?.profile}
                        size={140}
                        rounded
                        containerStyle={styles.avatarContainer}
                        activeOpacity={0.8}
                    >
                        {user && (
                            <AvatarEditButton
                                onPictureSelected={(imageInfo: ImageInfo) => {
                                    (store.dispatch as MyThunkDispatch)(setAvatar(imageInfo));
                                }}
                            />
                        )}
                    </EnlargeableAvatar>
                    <Text style={styles.name}>{fullName}</Text>
                    {user && <Text />}
                </WavyHeader>
                <ScrollFormWrapper contentStyle={styles.content}>
                    <Text style={styles.title}>{i18n.t("myProfile")}</Text>
                    {profileFieldComponents}
                    {!user && <ActivityIndicator size="large" color={theme.accent} />}
                </ScrollFormWrapper>
            </>
        );
    }
}

export const themedStyles = preTheme((theme: Theme) => {
    return StyleSheet.create({
        // Header-related styles
        header: {
            alignItems: "center",
        },
        name: {
            fontSize: 30,
            color: theme.textWhite,
            marginTop: 15,
        },
        university: {
            fontSize: 14,
            color: theme.textWhite,
        },
        universityContainer: {
            marginVertical: 5,
        },
        avatarContainer: {
            backgroundColor: theme.accentSecondary,
            borderColor: theme.cardBackground,
            borderWidth: 2,
        },
        avatarAccessory: {
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 0,
            borderColor: "transparent",
            shadowRadius: 0,
            textShadowRadius: 0,
            color: "#444",
        },

        // Content-related style
        content: {
            width: "90%",
            paddingTop: 85,
            marginBottom: 40,
        },
        title: {
            fontSize: 22,
            color: theme.text,
            marginBottom: 20,
            width: "100%",
        },

        cardText: {
            color: theme.text,
        },
        staffRoleButton: {
            marginTop: 10,
        },
        birthdateInputContainer: {
            marginTop: 20,
            marginBottom: 50,
        },
        birthdateInput: {
            height: 50,
            fontSize: 16,
            borderRadius: 10,
            backgroundColor: theme.cardBackground,
            color: theme.text,
        },
    });
});

export default withTheme(EditProfileForm);
