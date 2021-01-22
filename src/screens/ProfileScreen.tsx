import {StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import {connect, ConnectedProps} from "react-redux";
import {AppState, MyThunkDispatch} from "../state/types";
import {TabProfileRoot} from "../navigation/types";
import {ThemeProps} from "../types";
import {withTheme} from "react-native-elements";
import {fetchUser} from "../state/profile/actions";
import ScreenWrapper from "./ScreenWrapper";

const reduxConnector = connect((state: AppState) => ({
    user: state.profile.user,
}));

type ProfileScreenProps = ConnectedProps<typeof reduxConnector> &
    ThemeProps &
    StackScreenProps<TabProfileRoot, "ProfileScreen">;

class ProfileScreen extends React.Component<ProfileScreenProps> {
    componentDidMount() {
        this.props.navigation.addListener("focus", () => this.onFocus());
        this.onFocus();
    }

    onFocus() {
        (this.props.dispatch as MyThunkDispatch)(fetchUser());
    }

    render(): JSX.Element {
        const {user, dispatch} = this.props;

        return (
            <ScreenWrapper>
                <ProfileView user={user} />
            </ScreenWrapper>
        );
    }
}

export default reduxConnector(withTheme(ProfileScreen));
