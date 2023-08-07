import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, useDrawerProgress } from '@react-navigation/drawer';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import AnimationOne from './screens/AnimationOne/AnimationOne';
import AnimationTwo from './screens/AnimationTwo/AnimationTwo';
import CustomDrawer from './components/CustomDrawer/CustomDrawer';
import { withCustomDrawer } from './withCustomDrawer';
import AppProvider from './context/AppContext';

export default function App() {

	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
		Roboto_700Bold
	})

	if (!fontsLoaded) {
		return null
	}

	const Drawer = createDrawerNavigator()

	return (
		// <SafeAreaView style={styles.container}>
		<AppProvider>
			<StatusBar style="dark" />
			<NavigationContainer>
				<Drawer.Navigator
					drawerContent={(props) => <CustomDrawer {...props} />}
					screenOptions={{
						unmountOnBlur: true,
						drawerType: "slide",
						headerShown: false,
						overlayColor: "transparent",
						drawerHideStatusBarOnOpen: true,
						drawerStyle: {
							width: "60%"
						},
						sceneContainerStyle: {
							backgroundColor: "#2e2f36"
						}
					}}
				>
					<Drawer.Screen
						name="AnimationOne"
						component={withCustomDrawer(AnimationOne)}
						options={{
							drawerLabel: "Animation One",
						}}
					/>
					<Drawer.Screen
						name='AnimationTwo'
						component={withCustomDrawer(AnimationTwo)}
						options={{
							drawerLabel: "Animation Two"
							// unmountOnBlur: true
						}}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		</AppProvider>
		// </SafeAreaView>
	);
}
