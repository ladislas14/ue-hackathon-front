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
} from "react-native";
import {connect, ConnectedProps} from "react-redux";
import {withTheme} from "react-native-elements";
import {Theme, ThemeProps} from "../types";
import {preTheme} from "../styles/utils";
import {InteractiveSectionList} from "./interactive-section-list";
import {requestOFF} from "../api/openfoodfacts";
import {OFFPaginatedResponse, OFFProductDto} from "../api/openfoodfacts/dto";
import {FoodProduct} from "../model/products";
import {TouchableOpacity} from "react-native-gesture-handler";

// Map props from store
const reduxConnector = connect(() => ({}));

// Component props
export type ProductsListingProps = ConnectedProps<typeof reduxConnector> & {
    date: Date;
    containerStyle?: StyleProp<ViewStyle>;
    onClickItem?: (p: FoodProduct) => void;
} & ViewProps &
    ThemeProps;

const ITEM_HEIGHT = 150;
const ITEMS_PER_ROW = 3;

type ProductsSection = {title: string; data: FoodProduct[]};
type ProductsData = ProductsSection[];

// Component state
type ProductsListingState = {productsData: ProductsData; loading: boolean};

class ProductsListing extends React.Component<ProductsListingProps, ProductsListingState> {
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
        const {date} = this.props;
        if (date === null) this.setProducts([]);
        else {
            this.setState({...this.state, loading: true});
            requestOFF("cgi/search.pl", "GET", {action: "process", json: true, page_size: 50}).then((r) => {
                const resp = r as OFFPaginatedResponse;
                const products = (resp.products as OFFProductDto[]).map(
                    (p: OFFProductDto): FoodProduct => ({
                        id: p.id,
                        name: p.product_name,
                        category: p.categories_hierarchy[0].split(":")[1],
                        thumbnailUrl: p.image_small_url,
                    }),
                );

                /*const p = resp.products[0];
                console.log(
                    Object.keys(p)
                        .filter((k) => k.match("categor") !== null)
                        .map((k) => `${k}: ${JSON.stringify(p[k])}`),
                );*/
                //console.log((resp.products as OFFProductDto[]).map((p: OFFProductDto) => p.categories));

                this.setProducts(products);
                this.setState({...this.state, loading: false});
            });
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
        const {theme, containerStyle, onClickItem} = this.props;
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
                    renderItem={(info: SectionListRenderItemInfo<FoodProduct, DefaultSectionT>) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.item}
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
                                <Text style={styles.itemPrice}>{(info.item.name.length * 0.5).toFixed(2)}€</Text>
                            </View>
                        </TouchableOpacity>
                    )}
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
            width: Dimensions.get("window").width / ITEMS_PER_ROW - ITEM_HORIZONTAL_MARGIN * 2 - 1,
            height: ITEM_HEIGHT,
            marginHorizontal: ITEM_HORIZONTAL_MARGIN,
            marginVertical: 4,
            borderRadius: 20,
            overflow: "hidden",
            paddingHorizontal: 5,
            paddingTop: 5,
            paddingBottom: 10,
        },
        itemThumbnail: {
            width: "100%",
            flex: 1,
            marginBottom: 5,
        },
        itemName: {
            fontSize: 12,
        },
        itemPrice: {
            fontSize: 12,
        },
        itemInfoContainer: {
            height: 50,
            justifyContent: "space-between",
        },
    });
});

export default reduxConnector(withTheme(ProductsListing));
