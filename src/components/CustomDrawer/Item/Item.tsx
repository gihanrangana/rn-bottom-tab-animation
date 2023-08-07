import React, { useEffect } from 'react';
import { DrawerItem } from '@react-navigation/drawer'
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { useApp } from '../../../context/AppContext';

import styles from './Item.scss'

const Item: React.FC<ItemProps> = (props) => {

    const { index, isActive } = props;

    const { drawer } = useApp()

    const _isOpen = useSharedValue(0)

    const itemStyle = useAnimatedStyle(() => {
        return {
            marginLeft: withSpring(interpolate(_isOpen.value, [0, 1], [-100, 0], {
                extrapolateLeft: Extrapolate.CLAMP
            })),
            opacity: interpolate(_isOpen.value, [0, 1], [0, 1], {
                extrapolateLeft: Extrapolate.CLAMP
            })
        }
    })

    useEffect(() => {

        let timeOut: any;

        if (drawer?.drawerStatus) {
            timeOut = setTimeout(() => {
                _isOpen.value = 1;
            }, 200 * (index + 1))
        }

        if (!drawer?.drawerStatus) {
            timeOut = setTimeout(() => {
                _isOpen.value = 0;
            }, 500)
        }
        return () => clearTimeout(timeOut)

    }, [drawer?.drawerStatus])


    return (
        <Animated.View
            style={[itemStyle]}
        >
            <DrawerItem
                {...props}
                labelStyle={isActive ? styles.labelActive : styles.label}
                style={isActive ? styles.itemActive : styles.item}
            />
        </Animated.View>
    )
}

interface ItemProps {
    index: number;
    activeIndex: number
    isActive: boolean
    /**
   * The label text of the item.
   */
    label:
    | string
    | ((props: { focused: boolean; color: string }) => React.ReactNode);
    /**
     * Icon to display for the `DrawerItem`.
     */
    icon?: (props: {
        focused: boolean;
        size: number;
        color: string;
    }) => React.ReactNode;
    /**
     * URL to use for the link to the tab.
     */
    to?: string;
    /**
     * Whether to highlight the drawer item as active.
     */
    focused?: boolean;
    /**
     * Function to execute on press.
     */
    onPress: () => void;
    /**
     * Color for the icon and label when the item is active.
     */
    activeTintColor?: string;
    /**
     * Color for the icon and label when the item is inactive.
     */
    inactiveTintColor?: string;
    /**
     * Background color for item when its active.
     */
    activeBackgroundColor?: string;
    /**
     * Background color for item when its inactive.
     */
    inactiveBackgroundColor?: string;
    /**
     * Color of the touchable effect on press.
     * Only supported on Android.
     *
     * @platform android
     */
    pressColor?: string;
    /**
     * Opacity of the touchable effect on press.
     * Only supported on iOS.
     *
     * @platform ios
     */
    pressOpacity?: number;
    /**
     * Style object for the label element.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Style object for the wrapper element.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Whether label font should scale to respect Text Size accessibility settings.
     */
    allowFontScaling?: boolean;

    /**
     * Accessibility label for drawer item.
     */
    accessibilityLabel?: string;
    /**
     * ID to locate this drawer item in tests.
     */
    testID?: string;
}

export default Item;