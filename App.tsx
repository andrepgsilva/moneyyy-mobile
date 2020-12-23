import React from 'react';
import { StyleSheet } from 'react-native';
import Routes from './src/Routes';

// eslint-disable-next-line camelcase
import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

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
    <Routes/>
  );
};

StyleSheet.create({});
