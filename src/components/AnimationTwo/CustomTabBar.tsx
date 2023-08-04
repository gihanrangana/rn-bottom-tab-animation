import React from 'react';
import Svg, { Path } from 'react-native-svg'
import Animated, {
    runOnJS,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import usePath from '../../hooks/usePath';
import { getPathXCenter } from '../../utils';

import styles from './CustomTabBar.scss'
import { Dimensions, View } from 'react-native';
import { interpolatePath } from 'react-native-redash';
import AnimatedCircle from './AnimatedCircle/AnimatedCircle';
import TabBarItem from './TabBarItem/TabBarItem';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const AnimatedPath = Animated.createAnimatedComponent(Path)

const CustomTabBar: React.FC<CustomTabBarProps> = (props) => {

    const { state, descriptors, navigation } = props

    const { containerPath, curvedPaths, tHeight } = usePath();

    const circleXCoordinate = useSharedValue(0);
    const progress = useSharedValue(1);
    const handleMoveCircle = (currentPath: string) => {
        circleXCoordinate.value = getPathXCenter(currentPath);
    };

    const getIcon = (route: string) => {
        switch (route) {
            case "Products":
                return "home"
            case "Cart":
                return "shopping-bag"
            case "Favorites":
                return "star"
            case "Profile":
                return "user"
            default:
                return "home"
        }
    }


    const animatedProps = useAnimatedProps(() => {
        const currentPath = interpolatePath(
            progress.value,
            Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
            curvedPaths,
        );
        runOnJS(handleMoveCircle)(currentPath);
        return {
            d: `${containerPath} ${currentPath}`,
        };
    });

    const handleTabPress = (index: number, route: string) => {
        navigation.navigate(route)
        progress.value = withTiming(index)
    }

    return (
        <View style={styles.tabBarContainer}>
            <Svg width={SCREEN_WIDTH} height={tHeight} style={styles.shadowMd}>
                <AnimatedPath fill={'white'} animatedProps={animatedProps} />
            </Svg>

            <AnimatedCircle circleX={circleXCoordinate} size={50} />

            <View style={[styles.tabItemsContainer, { height: tHeight }]}>

                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key]
                    const label = options.tabBarLabel ? options.tabBarLabel : route.name;

                    return <TabBarItem
                        key={index.toString()}
                        label={label as string}
                        icon={getIcon(route.name)}
                        activeIndex={state.index + 1}
                        index={index}
                        onTabPress={() => handleTabPress(index + 1, route.name)}
                        iconSize={25}
                    />
                })}

            </View>

        </View>
    )
}

interface CustomTabBarProps extends BottomTabBarProps {
    [key: string]: any
}

export default CustomTabBar;