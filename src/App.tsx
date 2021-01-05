import {registerRootComponent} from "expo";
import React, {useState} from "react";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import {Provider} from "react-redux";
import configureLocalization from "./localization";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ConnectedThemeProvider from "./components/providers/ConnectedThemeProvider";
import store from "./state/store";
import ThemedStatusBar from "./components/ThemedStatusBar";
import {initPolyfills} from "./state/polyfills";

function App() {
    initPolyfills();
    const {isLoadingComplete, initialRoute} = useCachedResources();
    configureLocalization();

    const [navigationReady, setNavigationReady] = useState<boolean>(false);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Provider store={store}>
                    <ConnectedThemeProvider>
                        <Navigation onReady={() => setNavigationReady(true)} initialRoute={initialRoute} />
                        {navigationReady && <ThemedStatusBar />}
                    </ConnectedThemeProvider>
                </Provider>
            </SafeAreaProvider>
        );
    }
}

export default registerRootComponent(App);
