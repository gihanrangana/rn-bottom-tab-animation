import React, { useEffect } from 'react';
import { DrawerContentScrollView, DrawerContentComponentProps, useDrawerStatus } from '@react-navigation/drawer';
import { View, Image, Text, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Item from './Item/Item';
import { useApp } from '../../context/AppContext';

import styles from './CustomDrawer.scss'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomDrawer: React.FC<CustomDrawerProps> = (props) => {

    const { state, descriptors, navigation } = props;

    const { drawer } = useApp()
    const status = useDrawerStatus()

    const _opacity = useSharedValue(0)

    const handleOnPress = (route: string) => {
        navigation.navigate(route);
    }

    useEffect(() => {

        drawer?.setDrawerStatus(status === "open" ? 1 : 0)

    }, [status])

    useEffect(() => {

        if (drawer?.drawerStatus === undefined) return;

        const timeOut = setTimeout(() => {
            _opacity.value = drawer?.drawerStatus
        }, 200)

        return () => clearTimeout(timeOut)
    }, [drawer?.drawerStatus])

    const userAreaStyle = useAnimatedStyle(() => {

        return {
            opacity: withTiming(interpolate(_opacity.value, [0, 1], [0, 1], {
                extrapolateLeft: Extrapolate.CLAMP
            }))
        }
    })

    return (
        <Animated.View style={[styles.drawerContainer]}>

            <Animated.View style={[styles.userArea, userAreaStyle]}>


                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../../../assets/user.png')}
                        style={styles.avatar}
                    />
                </View>

                <View>
                    <Text style={[styles.name]}>Coders Life</Text>
                    <Text style={[styles.username]}>@coderslife</Text>
                </View>

            </Animated.View>

            <DrawerContentScrollView {...props} contentContainerStyle={{ marginTop: 50 }}>
                {state.routes.map((route, index) => {

                    const { options } = descriptors[route.key]

                    return (
                        <Item
                            key={route.key.toString()}
                            label={options.drawerLabel || route.name}
                            isActive={state.index === index}
                            activeIndex={state.index}
                            index={index}
                            onPress={handleOnPress.bind(null, route.name)}
                        />
                    )
                })}
            </DrawerContentScrollView>

            <TouchableOpacity
                onPress={() => {
                    // Do Logout
                }}
                style={styles.logout}
            >
                    <Feather name='log-out' color={"white"}/>
                    <Text style={{ color:'white' }}>LogOut</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

interface CustomDrawerProps extends DrawerContentComponentProps {
    [key: string]: any
}

export default CustomDrawer;