import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { Feather } from "@expo/vector-icons";
import TabBar1 from '../AnimationOne/CustomTabBar';
import TabBar2 from '../AnimationTwo/CustomTabBar';
import HomeTabScreen from '../../screens/Tabs/HomeTabScreen';

const TabNavigator: React.FC<TabNavigatorProps> = (props) => {

    const { tabBar } = props;
    const Tab = createBottomTabNavigator()
    const navigation: any = useNavigation()

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                headerLeft: (props) => {

                    return (
                        <Pressable
                            onPress={navigation.openDrawer}
                        >
                            <Feather name='menu' size={24} {...props} />
                        </Pressable>
                    )
                },
                headerLeftContainerStyle: {
                    paddingLeft: 15,
                    paddingRight: 15,
                }
            }}
            tabBar={(props) => {
                if (tabBar === '1') {
                    return <TabBar1 {...props} height={64} />
                }
                if (tabBar === '2') {
                    return <TabBar2 {...props} height={64} />
                }
            }}
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

interface TabNavigatorProps {
    [key: string]: any
}

export default TabNavigator;