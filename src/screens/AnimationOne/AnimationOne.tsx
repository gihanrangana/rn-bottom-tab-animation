import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeTabScreen from '../Tabs/HomeTabScreen';
import CustomTabBar from '../../components/AnimationOne/CustomTabBar';

const AnimationOne: React.FC<AnimationOneProps> = (props) => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props) => <CustomTabBar {...props} height={64} />}
        >
            <Tab.Group>
                <Tab.Screen options={{ tabBarLabel: "Home" }} name='Products' component={HomeTabScreen} />
                <Tab.Screen options={{ tabBarLabel: "Cart" }} name='Cart' component={HomeTabScreen} />
                <Tab.Screen options={{ tabBarLabel: "Favorites" }} name='Favorites' component={HomeTabScreen} />
                <Tab.Screen options={{ tabBarLabel: "Profile" }} name='Profile' component={HomeTabScreen} />
            </Tab.Group>

        </Tab.Navigator>
    )
}

interface AnimationOneProps {
    [key: string]: any
}

export default AnimationOne;