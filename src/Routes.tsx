import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';

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
      </Navigator>
    </NavigationContainer>
  );
}
