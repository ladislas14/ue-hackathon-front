import * as React from "react";
import i18n from "i18n-js";
import {Role, ROLES} from "../constants/profile-constants";
import {ButtonGroup, ButtonGroupProps, withTheme} from "react-native-elements";
import {ThemeProps} from "../types";
import {getToggleStyleProps, ToggleStyleVariant} from "../styles/toggles";

export type RoleToggleProps = {
    role: Role | null;
    onSelect?: (role: Role) => void;
    styleVariant?: ToggleStyleVariant;
} & Partial<ButtonGroupProps> &
    ThemeProps;

function RoleToggle(props: RoleToggleProps): JSX.Element {
    const {role, onSelect, theme, styleVariant, ...otherProps} = props;

    const buttonLabels = ROLES.map((r: string) => i18n.t(`roles.${r}`));

    return (
        <ButtonGroup
            onPress={(idx: number) => {
                if (onSelect) onSelect(ROLES[idx]);
            }}
            selectMultiple={true}
            selectedIndex={role ? ROLES.indexOf(role) : undefined}
            buttons={buttonLabels}
            {...getToggleStyleProps(styleVariant, theme)}
            {...otherProps}
        />
    );
}

export default withTheme(RoleToggle);
