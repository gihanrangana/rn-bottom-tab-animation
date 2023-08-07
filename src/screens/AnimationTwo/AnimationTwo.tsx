import React from 'react';
import TabNavigator from '../../components/TabNavigator/TabNavigator';

const AnimationTwo: React.FC<AnimationTwoProps> = (props) => {

    return (
        <TabNavigator tabBar="2" />
    )
}

interface AnimationTwoProps {
    [key: string]: any
}

export default AnimationTwo;