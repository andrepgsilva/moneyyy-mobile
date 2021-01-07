import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Content from './pages/Content';

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
      </Navigator>
    </NavigationContainer>
  );
}
