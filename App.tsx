import React from 'react';
import { StyleSheet } from 'react-native';
import Routes from './src/Routes';
import { Provider } from 'react-redux';
import store from './src/store';
import axios from 'axios';
import { interceptorsResponse, interceptorsError } from './src/AjaxInterceptors';

// eslint-disable-next-line camelcase
import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

axios.defaults.baseURL = 'http://192.168.1.8:8000';
axios.defaults.withCredentials = true;
axios.interceptors.response.use(interceptorsResponse, interceptorsError);

export default function App () {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
};

StyleSheet.create({});
