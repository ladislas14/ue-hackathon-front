import * as React from "react";
import {
    ViewProps,
    StyleSheet,
    View,
    Text,
    Dimensions,
    DefaultSectionT,
    SectionListRenderItemInfo,
    ActivityIndicator,
    Image,
    StyleProp,
    ViewStyle,
    TouchableOpacity,
} from "react-native";
import {connect, ConnectedProps} from "react-redux";
import {withTheme} from "react-native-elements";
import {Theme, ThemeProps} from "../types";
import {preTheme} from "../styles/utils";
import {InteractiveSectionList} from "./interactive-section-list";
import {FoodProduct} from "../model/products";
import store from "../state/store";
import {getBookingProducts} from "../state/booking/actions";
import {MyThunkDispatch} from "../state/types";
import {getAvailabilityProducts} from "../state/availability/actions";

// Map props from store
const reduxConnector = connect(() => ({}));

// Component props
export type ProductsListingProps = ConnectedProps<typeof reduxConnector> & {
    date: Date;
    highlightedItems?: string[];
    containerStyle?: StyleProp<ViewStyle>;
    onClickItem?: (p: FoodProduct) => void;
    isStaff: boolean;
} & ViewProps &
    ThemeProps;

const ITEM_HEIGHT = 150;
const ITEMS_PER_ROW = 3;

type ProductsSection = {title: string; data: FoodProduct[]};
type ProductsData = ProductsSection[];

// Component state
type ProductsListingState = {productsData: ProductsData; loading: boolean};

class ProductsListing extends React.Component<ProductsListingProps, ProductsListingState> {
    sectionListRef = React.createRef<typeof InteractiveSectionList>();

    constructor(props: ProductsListingProps) {
        super(props);
        this.state = {productsData: [], loading: false};
    }

    componentDidMount(): void {
        this.updateProducts();
    }

    componentDidUpdate(oldProps: ProductsListingProps): void {
        const {date} = this.props;
        if (date != oldProps.date) {
            this.updateProducts();
        }
    }

    updateProducts(): void {
        const {date, isStaff} = this.props;
        if (date === null) this.setProducts([]);
        else {
            this.setState({...this.state, loading: true});

            if (isStaff) {
                (store.dispatch as MyThunkDispatch)(getAvailabilityProducts()).then((products: FoodProduct[]) => {
                    this.setProducts(products);
                    this.setState({...this.state, loading: false});
                });
            } else {
                (store.dispatch as MyThunkDispatch)(getBookingProducts()).then((products: FoodProduct[]) => {
                    this.setProducts(products);
                    this.setState({...this.state, loading: false});
                });
            }
        }
    }

    private setProducts(products: FoodProduct[]): void {
        const perCategory: {[key: string]: FoodProduct[]} = {};
        products.forEach((p) => {
            if (!perCategory[p.category]) perCategory[p.category] = [];
            perCategory[p.category].push(p);
        });

        const productsData: ProductsData = Object.keys(perCategory).map((k) => ({title: k, data: perCategory[k]}));
        this.setState({...this.state, productsData});
    }

    render(): JSX.Element {
        const {theme, containerStyle, onClickItem, highlightedItems} = this.props;
        const {productsData, loading} = this.state;
        const styles = themedStyles(theme);

        return (
            <View style={containerStyle}>
                {loading && <ActivityIndicator size="large" color={theme.accent} />}
                <InteractiveSectionList
                    data={productsData}
                    itemHeight={ITEM_HEIGHT}
                    itemsPerRow={ITEMS_PER_ROW}
                    tabbarItemActiveColor={theme.accent}
                    tabbarItemTitleActiveColor={theme.textWhite}
                    renderItem={(info: SectionListRenderItemInfo<FoodProduct, DefaultSectionT>) => {
                        const highlighted = highlightedItems && highlightedItems?.indexOf(info.item.id) !== -1;
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.item, highlighted ? styles.itemHighlighted : {}]}
                                onPress={() => {
                                    if (onClickItem) onClickItem(info.item);
                                }}
                            >
                                <Image
                                    source={{uri: info.item.thumbnailUrl}}
                                    style={styles.itemThumbnail}
                                    resizeMode="contain"
                                />
                                <View style={styles.itemInfoContainer}>
                                    <Text style={styles.itemName} numberOfLines={2}>
                                        {info.item.name}
                                    </Text>
                                    <Text style={styles.itemInfo}>{info.item.price.toFixed(2)}€</Text>
                                    <Text style={styles.itemInfo}>({info.item.remaningQuantity} remaining)</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        );
    }
}

export const themedStyles = preTheme((theme: Theme) => {
    const ITEM_HORIZONTAL_MARGIN = 4;
    return StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            flexDirection: "row",
        },
        item: {
            backgroundColor: theme.cardBackground,
            width: (Dimensions.get("window").width - 16) / ITEMS_PER_ROW - ITEM_HORIZONTAL_MARGIN * 2 - 1,
            height: ITEM_HEIGHT,
            marginHorizontal: ITEM_HORIZONTAL_MARGIN,
            marginVertical: 4,
            borderRadius: 20,
            overflow: "hidden",
            paddingHorizontal: 5,
            paddingTop: 5,
            paddingBottom: 10,
        },
        itemHighlighted: {
            backgroundColor: theme.accentSlight,
        },
        itemThumbnail: {
            width: "100%",
            flex: 1,
            marginBottom: 5,
        },
        itemName: {
            fontSize: 12,
        },
        itemInfo: {
            fontSize: 12,
        },
        itemInfoContainer: {
            height: 50,
            justifyContent: "space-between",
        },
    });
});

export default reduxConnector(withTheme(ProductsListing));
