import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlanetScreen from '../screens/PlanetScreen';
import SuccessScreen from '../screens/SuccessScreen';
const Stack = createStackNavigator();
const HomeScreens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Planets' component={PlanetScreen} />
            <Stack.Screen name='Success' component={SuccessScreen} />
        </Stack.Navigator>
    );
}
export default function HomeStack() {
    return (
        <NavigationContainer>
            <HomeScreens />
        </NavigationContainer>
    );
}