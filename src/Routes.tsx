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
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Content from './pages/Content';
import Common from './pages/Common';
import store from './store';
import { useSelector } from 'react-redux';
import { userSelector } from './store/reducers/AuthReducer';


type IconName = 'person' | 'wallet-outline' | 'add-circle-outline' | 'person-outline';


const { Navigator, Screen } = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
  //TODO This value need to come from the secure store 
  const isLoggedIn = useSelector(userSelector);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: IconName = 'person';

              switch (route.name) {
                case 'Bills':
                  iconName = 'wallet-outline';
                  break;
                case 'ForgotPassword':
                  iconName = 'add-circle-outline';
                  break;
                case 'Common':
                  iconName = 'person-outline';
                  break;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            }
          })}
          tabBarOptions={{
            activeTintColor: '#19734a',
            inactiveTintColor: '#2ac17c',
            showLabel: false,
          }}
        >
          <Tab.Screen name='Bills' component={Bills} />
          <Tab.Screen name='ForgotPassword' component={ForgotPassword} />
          <Tab.Screen name='Common' component={Common} />
        </Tab.Navigator>

      ) : (
          <Navigator>
            <Screen
              name='Login'
              component={Login}
              options={{ headerShown: false }}
            />
            <Screen
              name='Signup'
              component={Signup}
              options={{ headerShown: false }}
            />
            <Screen
              name='ForgotPassword'
              component={ForgotPassword}
              options={{ headerShown: true, title: i18n.t('auth.forgot_password'), headerTintColor: '#4d5349' }}
            />
            <Screen
              name='MatchPasswordToken'
              component={MatchPasswordToken}
              options={{ headerShown: true, title: i18n.t('auth.code_confirmation'), headerTintColor: '#4d5349' }}
            />
            <Screen
              name='ResetPassword'
              component={ResetPassword}
              options={{ headerShown: true, title: i18n.t('auth.reset_password'), headerTintColor: '#4d5349' }}
            />
          </Navigator>

        )}
    </NavigationContainer>
  );
}
