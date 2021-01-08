import React from "react";
import {View, Text, Image} from "react-native";
import {TreflePlantDto} from "../../api/trefle/dto";

export type TreeProps = {
    plant: TreflePlantDto | null;
};

class Tree extends React.Component<TreeProps> {
    render(): JSX.Element {
        const {plant} = this.props;
        return (
            <View>
                {plant && (
                    <>
                        {plant.image_url && <Image source={{uri: plant.image_url}} />}
                        <Text>{plant.id}</Text>
                        <Text>{plant.slug}</Text>
                        <Text>{plant.scientific_name}</Text>
                    </>
                )}
            </View>
        );
    }
}

export default Tree;
