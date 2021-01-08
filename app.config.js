const TARGET = process.env.TARGET || "STAGING";

const VERSION = "0.1.0";
const ANDROID_VERSION_CODE = 1;
const PRODUCTION_SERVER_HOST = "api.hackathon.lad-dev.team";
const STAGING_SERVER_HOST = "127.0.0.1";

let EXTRAS = {};

if (TARGET === "PRODUCTION") {
    EXTRAS = {
        SERVER_HOST: PRODUCTION_SERVER_HOST,
        SERVER_URL: `https://${PRODUCTION_SERVER_HOST}`,
        DEBUG: false,
    };
} else {
    EXTRAS = {
        SERVER_HOST: STAGING_SERVER_HOST,
        SERVER_URL: `https://${STAGING_SERVER_HOST}`,
        DEBUG: true,
    };
}

export default {
    expo: {
        name: "Hackathon",
        slug: "hackAThon",
        owner: "kelianb",
        privacy: "unlisted",
        version: VERSION,
        orientation: "portrait",
        userInterfaceStyle: "automatic",
        icon: "./assets/images/icon.png",
        scheme: "sea-eu-around",
        entryPoint: "./src/App.tsx",
        extra: {
            TARGET,
            ...EXTRAS,
        },
        updates: {
            enabled: true,
            fallbackToCacheTimeout: 5000,
        },
        splash: {
            image: "./assets/images/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        assetBundlePatterns: ["**/*"],
        packagerOpts: {
            config: "metro.config.js",
            sourceExts: ["expo.ts", "expo.tsx", "expo.js", "expo.jsx", "ts", "tsx", "js", "jsx", "json", "wasm", "svg"],
        },
        ios: {
            icon: "./assets/images/icon.ios.png",
            supportsTablet: true,
            bundleIdentifier: "com.sea-eu.around",
            buildNumber: VERSION,
        },
        android: {
            package: "com.sea_eu.around",
            versionCode: ANDROID_VERSION_CODE,
            permissions: [],
            /*intentFilters: [
                {
                    action: "VIEW",
                    data: [
                        {
                            scheme: CLIENT_HTTP,
                            host: CLIENT_HOST,
                            pathPrefix: "/",
                        },
                    ],
                    category: ["BROWSABLE", "DEFAULT"],
                },
            ],*/
            useNextNotificationsApi: true,
        },
    },
};
