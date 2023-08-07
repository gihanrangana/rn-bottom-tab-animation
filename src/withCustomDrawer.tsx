import { View } from "react-native"
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated"
import { useDrawerProgress } from "@react-navigation/drawer"

const withCustomDrawer = (Component: React.FC<any>) => {

    const Wrapper = (props: any) => {

        const progress = useDrawerProgress()

        const wrapperStyle = useAnimatedStyle(() => {

            return {
                borderRadius: interpolate(progress.value, [0, 1], [0, 20], {
                    extrapolateLeft: Extrapolate.CLAMP
                }),
                transform: [
                    { perspective: 1000 },
                    {
                        scale: interpolate(progress.value, [0, 1], [1, .8], {
                            extrapolateRight: Extrapolate.CLAMP
                        })
                    },
                    {
                        rotateY: `${interpolate(progress.value, [0, 1], [0, -20], {
                            extrapolateRight: Extrapolate.CLAMP
                        })}deg`,
                    },
                    {
                        translateX: interpolate(progress.value, [0, 1], [0, -60], { extrapolateRight: Extrapolate.CLAMP })
                    }
                ],
                overflow: "hidden",
            }
        })

        return (
            <Animated.View style={[{ flex: 1, position: "absolute", height: "100%", width: "100%", zIndex: 99999 }, wrapperStyle]}>
                <View
                    style={[{ flex: 1 }]}
                >
                    {props.children}
                </View>
            </Animated.View>
        )
    }

    const Comp = (props: any) => (
        <Wrapper>
            <Component {...props} />
        </Wrapper>
    )

    return Comp
}

export { withCustomDrawer }