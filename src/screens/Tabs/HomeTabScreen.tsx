import React from 'react';
import { View, Text } from 'react-native'

const HomeTabScreen: React.FC<HomeTabScreenProps> = (props) => {

    return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#88AFFF",
            flex: 1
        }}>
            <Text>{props.route.name}</Text>
        </View>
    )
}

interface HomeTabScreenProps {
    [key: string]: any
}

export default HomeTabScreen;