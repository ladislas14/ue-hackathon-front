import {StyleSheet, ViewStyle, TextStyle, ImageStyle, Dimensions} from "react-native";

interface TabbarViewStyles {
    container: ViewStyle;
    contentContainer: ViewStyle;
    iconView: ViewStyle;
    icon: ImageStyle;
}

interface TabbarItemStyles {
    container: ViewStyle;
    innerContainer: ViewStyle;
    itemTitle: TextStyle;
}

interface ContentStyles {
    sectionList: ViewStyle;
    contentContainer: ViewStyle;
    sectionHeader: TextStyle;
    border: ViewStyle;
}

export const tabbarViewStyles = StyleSheet.create<TabbarViewStyles>({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {},
    iconView: {
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
    },
    icon: {
        width: 26,
        height: 26,
    },
});

export const tabbarItemStyles = StyleSheet.create<TabbarItemStyles>({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 50,
    },
    itemTitle: {
        fontSize: 18,
    },
});

export const contentViewStyles = StyleSheet.create<ContentStyles>({
    sectionList: {
        width: "100%",
    },
    contentContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    sectionHeader: {
        width: Dimensions.get("window").width,
        height: 40,
        padding: 8,
        fontSize: 20,
        fontWeight: "500",
    },
    border: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "gray",
    },
});
