import React from 'react';

import styles from './AnimatedCircle.scss'
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const AnimatedCircle: React.FC<AnimatedCircleProps> = (props) => {
    const { circleX, size } = props

    const circleContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: circleX.value - size / 2 }]
        }
    })

    return <Animated.View style={[circleContainerStyle, styles.container, {
        top: -size / 3.4,
        width: size,
        borderRadius: size,
        height: size,
    }]} />
}

interface AnimatedCircleProps {
    circleX: any,
    size: number
}

export default AnimatedCircle;