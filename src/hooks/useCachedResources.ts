import {FontAwesome} from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import {User} from "../model/user";
import {RootNavigatorScreens} from "../navigation/types";
import {attemptLoginFromCache} from "../state/auth/actions";
import {readCachedStaticData} from "../state/persistent-storage/static";
import {setTheme} from "../state/settings/actions";
import store from "../state/store";
import {MyThunkDispatch} from "../state/types";
import {ThemeKey} from "../types";

let loggedInFromCache: User | undefined = undefined;

export default function useCachedResources(): {isLoadingComplete: boolean; initialRoute?: keyof RootNavigatorScreens} {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                const dispatch = store.dispatch as MyThunkDispatch;

                // Load fonts
                await Font.loadAsync({
                    ...FontAwesome.font,
                    Raleway: require("@assets/fonts/Raleway-Regular.ttf"),
                    RalewayThin: require("@assets/fonts/Raleway-Thin.ttf"),
                    RalewayLight: require("@assets/fonts/Raleway-Light.ttf"),
                    RalewaySemiBold: require("@assets/fonts/Raleway-SemiBold.ttf"),
                    RalewayBold: require("@assets/fonts/Raleway-Bold.ttf"),
                });

                // Attempt to read the settings from persistent storage
                readCachedStaticData("theme").then((theme) => {
                    if (theme) store.dispatch(setTheme(theme.data as ThemeKey, true));
                });

                // Attempt to authenticate using cached data
                loggedInFromCache = await dispatch(attemptLoginFromCache());
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    let initialRoute: undefined | keyof RootNavigatorScreens = undefined;
    if (loggedInFromCache) initialRoute = loggedInFromCache.onboarded ? "MainScreenClient" : "OnboardingScreen";

    return {isLoadingComplete, initialRoute};
}
