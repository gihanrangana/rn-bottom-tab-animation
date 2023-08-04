import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeTabScreen from '../Tabs/HomeTabScreen';
import CustomTabBar from '../../components/AnimationTwo/CustomTabBar';

const AnimationTwo: React.FC<AnimationTwoProps> = (props) => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
            <Tab.Group
                screenOptions={{
                    headerShown: false
                }}
            >

                <Tab.Screen options={{ tabBarLabel: "Home" }} name='Products' component={HomeTabScreen} />
                <Tab.Screen options={{ tabBarLabel: "Cart" }} name='Cart' component={HomeTabScreen} />
                <Tab.Screen options={{ tabBarLabel: "Favorites" }} name='Favorites' component={HomeTabScreen} />
                <Tab.Screen options={{ tabBarLabel: "Profile" }} name='Profile' component={HomeTabScreen} />

            </Tab.Group>
        </Tab.Navigator>
    )
}

interface AnimationTwoProps {
    [key: string]: any
}

export default AnimationTwo;