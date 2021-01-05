import {StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import {connect, ConnectedProps} from "react-redux";
import {MyThunkDispatch} from "../state/types";
import {RootNavigatorScreens} from "../navigation/types";
import {ThemeProps} from "../types";
import {withTheme} from "react-native-elements";
import ProfileView from "../components/ProfileView";
import {UserProfile} from "../model/user-profile";
import {fetchProfile} from "../state/profile/actions";
import ScreenWrapper from "./ScreenWrapper";

const reduxConnector = connect(() => ({}));

// Component props
type ProfileScreenProps = ConnectedProps<typeof reduxConnector> & ThemeProps & StackScreenProps<RootNavigatorScreens>;

// Component state
type ProfileScreenState = {profile: UserProfile | null};

class ProfileScreen extends React.Component<ProfileScreenProps, ProfileScreenState> {
    constructor(props: ProfileScreenProps) {
        super(props);
        this.state = {profile: null};
    }

    getRouteParams(): {[key: string]: string | boolean | number} {
        const params = this.props.route.params;
        return params ? (params as {[key: string]: string | boolean | number}) : {};
    }

    componentDidMount() {
        const {dispatch} = this.props;

        this.props.navigation.addListener("focus", () => {
            const {id} = this.getRouteParams();
            if (id && (!this.state.profile || this.state.profile.id !== id)) {
                (dispatch as MyThunkDispatch)(fetchProfile(id as string)).then((profile) => {
                    this.setState({...this.state, profile});
                });
            }
        });
    }

    render(): JSX.Element {
        const {profile} = this.state;

        return (
            <ScreenWrapper>
                <ProfileView profile={profile} />
            </ScreenWrapper>
        );
    }
}

export default reduxConnector(withTheme(ProfileScreen));
