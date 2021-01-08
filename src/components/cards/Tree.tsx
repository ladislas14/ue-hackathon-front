import React from 'react'
import{StyleSheet, View, Text, Image} from 'react-native'
import TreflePlantDto from '../api/trefle/dto.ts'

export type TreeProps = {
    specie : TreflePlantDto | null
}

class Tree extends React.Component<TreeProps>
{
    render(): JSX.Element
    {
        return(
            <View>
                <Image source={{this.props.specie.image_url}}/>
                <Text> this.props.specie.id</Text>
                <Text> this.props.specie.common_name</Text>
                <Text> this.props.specie.slug</Text>
                <Text> this.props.specie.scientific_name</Text>
                <Text> this.props.specie.id</Text>
                <Text> this.props.specie.id</Text>
                <Text> this.props.specie.id</Text>

                            
            </View>
        )
    }
}

export default Tree