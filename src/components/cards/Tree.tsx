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
            <View style={{backgroundColor: "#eee", borderRadius: 10, padding: 20, margin: 20}}>
                {plant && (
                    <>
                        {plant.image_url && <Image source={{uri: plant.image_url}} style={{width: 100}} />}
                        <Text>{plant.id}</Text>
                        <Text>{plant.scientific_name}</Text>
                        {plant.common_name && plant.common_name.length > 0 && <Text>{plant.common_name}</Text>}
                    </>
                )}
            </View>
        );
    }
}

export default Tree;
