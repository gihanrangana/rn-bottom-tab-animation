import React, { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons'
import { getIcon } from '../../../utils';

import styles from './TabItem.scss'

const AnimatedIcon = Animated.createAnimatedComponent(Feather)

const TabItem: React.FC<TabItemProps> = (props) => {

    const { index, descriptor, route, iconSize, navigation, activeIndex } = props;

    const label = descriptor.options.tabBarLabel ? descriptor.options.tabBarLabel : route.name;

    const isActive = activeIndex === index;

    const scale = useSharedValue(0)
    const animatedActiveIndex = useSharedValue(activeIndex)
    const pressablePadding = useSharedValue(0)
    const labelPosition = useSharedValue(0)
    const color = useSharedValue(!isActive ? "rgba(128,128,128,1)" : "white")
    const labelOpacity = useSharedValue(0)
    const labelColor = useSharedValue(!isActive ? "rgba(128,128,128,1)" : "rgba(206, 132, 48,1)")

    const tabItemContainer = useAnimatedStyle(() => {

        const translateY = isActive ? -20 : 0

        return {
            transform: [
                { translateY: withTiming(translateY) },
                { scaleY: withSpring(scale.value) }
            ]
        }
    })

    const pressableStyle = useAnimatedStyle(() => {
        pressablePadding.value = isActive ? 10 : 0
        return {
            padding: withTiming(pressablePadding.value)
        }
    })

    const labelStyle = useAnimatedStyle(() => {

        labelPosition.value = isActive ? 35 : 100
        labelOpacity.value = isActive ? 1 : 0
        labelColor.value = isActive ? "rgba(206, 132, 48,1)" : "rgba(128,128,128,1)"

        return {
            opacity: withTiming(labelOpacity.value),
            transform: [
                { translateY: withTiming(labelPosition.value) }
            ]
        }
    })

    useEffect(() => {

        animatedActiveIndex.value = activeIndex

        const timeOut = setTimeout(() => {
            scale.value = 1
        }, 200 * (index + 1))

        return () => clearTimeout(timeOut)
    }, [])

    useEffect(() => {
        if (isActive) color.value = withTiming("white")
        if (!isActive) color.value = withTiming("rgba(128,128,128,1)")
    }, [isActive])

    const handleOnPress = () => {
        navigation.navigate(route.name)
    }

    const iconColor = useAnimatedProps(() => ({
        color: color.value
    }))

    return (
        <Animated.View style={[styles.tabItemContainer, tabItemContainer]}>
            <Pressable
                testID={`tab${label}`}
                hitSlop={{
                    top: 30, bottom: 30, left: 50, right: 50
                }}
                onPress={handleOnPress}
            >
                <Animated.View style={[isActive ? styles.active : {}, pressableStyle]}>
                    <AnimatedIcon name={getIcon(route.name)} size={iconSize} animatedProps={iconColor} />
                </Animated.View>
            </Pressable>

            <Animated.View style={[styles.tabLabel, labelStyle]}>
                <Text style={styles.label}>{label}</Text>
            </Animated.View>
        </Animated.View>
    )
}

interface TabItemProps {
    index: number;
    descriptor: any;
    route: any;
    iconSize: number;
    navigation: any;
    activeIndex: number;
}

export default TabItem;