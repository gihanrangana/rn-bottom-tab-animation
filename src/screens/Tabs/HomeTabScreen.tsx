import React from 'react';
import { View, Text } from 'react-native'

const HomeTabScreen: React.FC<HomeTabScreenProps> = (props) => {

    return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#66AAFF",
            flex: 1
        }}>
            <Text style={{ color: "white", fontSize: 24 }}>{props.route.name}</Text>
        </View>
    )
}

interface HomeTabScreenProps {
    [key: string]: any
}

export default HomeTabScreen;