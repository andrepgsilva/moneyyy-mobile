import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Content from './pages/Content';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import MatchPasswordToken from './pages/MatchPasswordToken';

const { Navigator, Screen } = createStackNavigator();

export default function Routes () {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Screen
          name="Content"
          component={Content}
          // options={{ headerShown: false }}
        />
        <Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: true, title: 'Forgot Password', headerTintColor: '#4d5349' }}
        />
        <Screen
          name="MatchPasswordToken"
          component={MatchPasswordToken}
          // options={{ headerShown: false }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
