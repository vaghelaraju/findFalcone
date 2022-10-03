import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DisplayJson from '../DisplayJson';
import HomeScreen from '../HomeScreen';
import PlanetScreen from '../screens/PlanetScreen';
import SuccessScreen from '../screens/SuccessScreen';
const Stack = createStackNavigator();
const HomeScreens = () => {
    return (
        <Stack.Navigator initialRouteName='Planets'>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='DisplayJson' component={DisplayJson} />
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