import React from 'react';
import TabNavigator from '../../components/TabNavigator/TabNavigator';

const AnimationOne: React.FC<AnimationOneProps> = (props) => {

    return (
        <TabNavigator tabBar="1" />
    )
}

interface AnimationOneProps {
    [key: string]: any
}

export default AnimationOne;