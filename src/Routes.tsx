import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Bills from './pages/Bills';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import MatchPasswordToken from './pages/MatchPasswordToken';
import i18n from './i18n';
import ResetPassword from './pages/ResetPassword';

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
          name="Bills"
          component={Bills}
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
          options={{ headerShown: true, title: i18n.t('auth.forgot_password'), headerTintColor: '#4d5349' }}
        />
        <Screen
          name="MatchPasswordToken"
          component={MatchPasswordToken}
          options={{ headerShown: true, title: i18n.t('auth.code_confirmation'), headerTintColor: '#4d5349' }}
        />
        <Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: true, title: i18n.t('auth.reset_password'), headerTintColor: '#4d5349' }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
