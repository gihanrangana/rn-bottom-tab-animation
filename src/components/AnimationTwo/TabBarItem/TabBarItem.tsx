import React, { useEffect } from 'react';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import usePath from '../../../hooks/usePath';
import { getPathXCenterByIndex } from '../../../utils';

import styles from './TabBarItem.scss'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const LABEL_WIDTH = SCREEN_WIDTH / 4

const AnimatedIcon = Animated.createAnimatedComponent(Feather)

const TabBarItem: React.FC<TabBarItemProps> = (props) => {

    const { label, icon, index, activeIndex, iconSize, onTabPress } = props

    const { curvedPaths } = usePath()

    const animatedActiveIndex = useSharedValue(activeIndex);
    const iconPosition = getPathXCenterByIndex(curvedPaths, index);
    const labelPosition = getPathXCenterByIndex(curvedPaths, index);
    const iconColor = useSharedValue(
        activeIndex === index + 1 ? 'white' : 'rgba(128,128,128,0.8)',
    );

    const tabStyle = useAnimatedStyle(() => {
        const translateY = animatedActiveIndex.value - 1 === index ? -4 : 16
        const iconPositionX = iconPosition - index * iconSize

        return {
            width: iconSize,
            height: iconSize,
            transform: [
                { translateY: withTiming(translateY) },
                { translateX: iconPositionX - iconSize / 2 }
            ]
        }
    })
    const labelContainerStyle = useAnimatedStyle(() => {
        const translateY = animatedActiveIndex.value - 1 === index ? 36 : 100;
        return {
            transform: [
                { translateY: withTiming(translateY) },
                { translateX: labelPosition - LABEL_WIDTH / 4 },
            ],
        };
    });

    useEffect(() => {
        animatedActiveIndex.value = activeIndex;
        if (activeIndex === index + 1) {
            iconColor.value = withTiming('white');
        } else {
            iconColor.value = withTiming('rgba(100,100,200,0.8)');
        }
    }, [activeIndex]);

    const animatedIconProps = useAnimatedProps(() => ({
        color: iconColor.value
    }))

    return (
        <>
            <Animated.View style={[tabStyle]}>

                <Pressable
                    testID={`tab${label}`}
                    hitSlop={{
                        top: 30, bottom: 30, left: 50, right: 50
                    }}
                    onPress={onTabPress}
                >
                    <AnimatedIcon
                        name={icon as any}
                        size={iconSize}
                        animatedProps={animatedIconProps}
                    />

                </Pressable>

            </Animated.View>

            <Animated.View style={[labelContainerStyle, styles.labelContainer]}>
                <Text style={styles.label}>{label}</Text>
            </Animated.View>
        </>
    )
}

interface TabBarItemProps {
    label: string;
    icon: string;
    index: number;
    activeIndex: number;
    onTabPress: () => void;
    iconSize: number
}

export default TabBarItem;