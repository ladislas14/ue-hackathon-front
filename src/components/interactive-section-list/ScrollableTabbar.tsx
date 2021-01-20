/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState, useRef} from "react";
import {View, Image, ScrollView, Dimensions, ImageSourcePropType} from "react-native";

import TabbarItem from "./TabbarItem";

import {tabbarViewStyles as styles} from "./styles";

export interface Props {
    items: Array<string>;
    onPress: (index: number) => void;
    selectedIndex: number;
    firstValueInView: string;
    isManualSelect: boolean;
    scrollDirection: string;
    itemWidth?: number;
    itemHeight?: number;
    itemSpaceBetween?: number;
    activeColor?: string;
    inactiveColor?: string;
    titleActiveColor?: string;
    titleInactiveColor?: string;
    fontSize?: number;
    icon?: ImageSourcePropType;
}

type positionType = {
    item: string;
    x: number;
    width: number;
    index: number;
};

const SCREEN_WIDTH = Dimensions.get("window").width;

const ScrollableTabbar: React.FC<Props> = ({
    items,
    onPress,
    selectedIndex,
    firstValueInView,
    isManualSelect,
    scrollDirection,
    itemWidth = 100,
    itemHeight = 50,
    itemSpaceBetween = 8,
    activeColor = "yellow",
    inactiveColor = "transparent",
    titleActiveColor = "#000000",
    titleInactiveColor = "#000000",
    fontSize = 14,
    icon,
}: Props) => {
    const scrollViewRef = useRef<any>(null);

    const [itemPositions, setItemPositions] = useState<Array<positionType>>([]);

    const getValues = () => {
        return items.map((item, index) => (
            <TabbarItem
                key={index}
                item={item}
                selected={index === selectedIndex}
                isFirstInView={firstValueInView === item}
                isManualSelect={isManualSelect}
                onPress={() => onPress(index)}
                onLayout={({nativeEvent}) => {
                    const positions = [...itemPositions];

                    positions.push({
                        item,
                        x: nativeEvent.layout.x,
                        width: nativeEvent.layout.width,
                        index: index,
                    });
                    setItemPositions(positions);
                }}
                itemWidth={itemWidth}
                itemHeight={itemHeight}
                activeColor={activeColor}
                inactiveColor={inactiveColor}
                titleActiveColor={titleActiveColor}
                titleInactiveColor={titleInactiveColor}
                fontSize={fontSize}
            />
        ));
    };

    useEffect(() => {
        if (isManualSelect) return;

        if (scrollViewRef && scrollViewRef.current) {
            itemPositions.forEach((itemPosition: positionType) => {
                if (
                    firstValueInView === itemPosition.item &&
                    scrollDirection === "DOWN" &&
                    itemPosition.x > SCREEN_WIDTH - itemWidth * 2
                ) {
                    scrollViewRef.current.scrollTo({
                        x: itemPosition.x - SCREEN_WIDTH + itemWidth * 2,
                        animated: true,
                    });
                } else if (firstValueInView === itemPosition.item && scrollDirection === "UP") {
                    scrollViewRef.current.scrollTo({
                        x: itemPosition.x - itemWidth,
                        animated: true,
                    });
                }
            });
        }
    }, [firstValueInView]);

    return (
        <View style={styles.container}>
            {icon && (
                <View style={styles.iconView}>
                    <Image source={icon} style={styles.icon} />
                </View>
            )}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                decelerationRate="fast"
                snapToInterval={itemWidth + itemSpaceBetween}
                snapToAlignment="start"
            >
                {getValues()}
            </ScrollView>
        </View>
    );
};

export default ScrollableTabbar;
