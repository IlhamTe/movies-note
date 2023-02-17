import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/home';
import SplashPage from '../pages/splash';


const Stack = createStackNavigator();

const Router = () => (
    <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='HomePage'
        screenOptions={{headerShown:false}}>
            <Stack.Screen name='SplashPage' component={SplashPage}/>
            <Stack.Screen name='HomePage' component={HomePage}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default Router