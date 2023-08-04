import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnimationOne from './screens/AnimationOne';

import styles from './App.scss';
import AnimationTwo from './screens/AnimationTwo/AnimationTwo';

export default function App() {

	const Stack = createNativeStackNavigator()

	return (
		// <SafeAreaView style={styles.container}>
		<>
			<StatusBar style="dark" />
			<NavigationContainer>
				<Stack.Navigator>
					{/* <Stack.Screen name='AnimationOne' component={AnimationOne} /> */}
					<Stack.Screen name='AnimationTwo' component={AnimationTwo} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
		// </SafeAreaView>
	);
}
