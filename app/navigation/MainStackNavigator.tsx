import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen, {RootStackParamList} from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateSetScreen from "@/app/screens/CreateSetScreen";
import ViewSetsScreen from "@/app/screens/ViewSetsScreen";
import SetDetailsScreen from "@/app/screens/SetDetailsScreen";
import IncomeScreen from "@/app/screens/IncomeScreen";

const Stack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="CreateSet" component={CreateSetScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="ViewSets" component={ViewSetsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="SetDetails" component={SetDetailsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Income" component={IncomeScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default MainStackNavigator;
