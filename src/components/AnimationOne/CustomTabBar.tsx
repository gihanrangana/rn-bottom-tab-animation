import React, { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import styles from './CustomTabBar.scss'
import { Dimensions } from 'react-native';
import TabItem from './TabItem/TabItem';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

const CustomTabBar: React.FC<CustomTabBarProps> = (props) => {

    const { height, descriptors, state, navigation } = props

    const _borderRadius = useSharedValue(0)
    const _scale = useSharedValue(0)

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withSpring(_scale.value) }
            ],
            borderRadius: withSpring(_borderRadius.value)
        }
    })

    useEffect(() => {

        const timeOut = setTimeout(() => {
            _borderRadius.value = 20
            _scale.value = 1;
        }, 100)

        return () => clearTimeout(timeOut)
    }, [])

    return (
        <Animated.View style={[containerStyle, styles.tabBarContainer, { width: SCREEN_WIDTH - 20, height }]}>
            {state.routes.map((route, index) => {

                return (
                    <TabItem
                        index={index}
                        key={index.toString()}
                        descriptor={descriptors[route.key]}
                        route={route}
                        iconSize={25}
                        navigation={navigation}
                        activeIndex={state.index}
                    />
                )
            })}
        </Animated.View>
    )
}

interface CustomTabBarProps extends BottomTabBarProps {
    height?: number
}

export default CustomTabBar;