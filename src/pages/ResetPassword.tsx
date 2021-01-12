import React, { useState } from 'react';
import _styles from '../css/styles';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { hasOwnProperty } from '../utils';
import i18n from '../i18n';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import * as SecureStore from 'expo-secure-store';
import {
  clearServerAuthErrors,
  serverLoginErrorsSelector,
  resetPassword
} from '../store/reducers/AuthReducer';

export default function ResetPassword () {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  let userEmail: any = '';
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const serverLoginErrors = useSelector(serverLoginErrorsSelector);

  SecureStore.getItemAsync('userEmail')
    .then(response => {
      userEmail = response;
    });

  const getConfirmationCode = () => {
    dispatch(clearServerAuthErrors());

    dispatch(resetPassword({ password, email: userEmail }))
      .then((asyncThunkResponse: object) => {
        const hasNotAserverError = !hasOwnProperty(asyncThunkResponse, 'error');
        const hasFormFieldsErrors = !hasOwnProperty(asyncThunkResponse, 'errors');

        if (hasNotAserverError && hasFormFieldsErrors) {
          navigation.navigate('Login');
        }
      });
  };

  const isPasswordsDifferent = password !== passwordConfirmation;
  const isButtonDisabled = password === '' || passwordConfirmation === '' || isPasswordsDifferent;
  const disabledClass = isButtonDisabled ? _styles['bg-main-color-light'] : _styles['bg-main-color'];

  return (
    <View
      style={[_styles.flexOne]}
    >
      <View style={[_styles.itemsCenter, _styles['mt-90']]}>
        <View
          style={[
            { width: '85%' }
          ]}
        >
          <View style={[_styles.itemsCenter]}>
            <Ionicons
              name="lock-closed-outline"
              color={_styles['text-main-color'].color}
              size={140}
            />
          </View>

          <View style={[_styles['mt-20']]}>
            <Text
              style={[_styles.defaultFontStyleBold, _styles['text-cool-gray-700']]}
            >
              { i18n.t('auth.you_can_recover_your_password') }
            </Text>
          </View>

          <View>
            <Ionicons
              name="md-lock-open-outline"
              color={_styles['text-cool-gray-400'].color}
              size={20}
              style={[_styles.positionAbsolute, { top: 45 }, { left: 20 }, _styles.zIndexTwo]}
            />
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              style={[
                _styles.zIndexOne,
                _styles['mt-25'],
                _styles['pl-50'],
                _styles['pt-16'],
                _styles['pb-16'],
                _styles['bg-white'],
                _styles['text-cool-gray-800'],
                _styles['w-full'],
                _styles.brThirty,
                _styles.defaultFontStyleSemiBold
              ]}
              secureTextEntry={true}
              placeholder={ i18n.t('auth.password') }
              placeholderTextColor={_styles['text-cool-gray-100'].color}
            ></TextInput>
          </View>

          <View>
            <Ionicons
              name="md-lock-open-outline"
              color={_styles['text-cool-gray-400'].color}
              size={20}
              style={[_styles.positionAbsolute, { top: 45 }, { left: 20 }, _styles.zIndexTwo]}
            />
            <TextInput
              value={passwordConfirmation}
              onChangeText={text => setPasswordConfirmation(text)}
              style={[
                _styles.zIndexOne,
                _styles['mt-25'],
                _styles['pl-50'],
                _styles['pt-16'],
                _styles['pb-16'],
                _styles['bg-white'],
                _styles['text-cool-gray-800'],
                _styles['w-full'],
                _styles.brThirty,
                _styles.defaultFontStyleSemiBold
              ]}
              placeholder={ i18n.t('auth.password_confirmation') }
              placeholderTextColor={_styles['text-cool-gray-100'].color}
              secureTextEntry={true}
            ></TextInput>
          </View>

          <TouchableOpacity
            onPress={getConfirmationCode}
            style={[
              _styles['mt-25'],
              _styles['pt-16'],
              _styles['pb-16'],
              disabledClass,
              _styles.brThirty
            ]}
            disabled={isButtonDisabled}
          >
            <Text style={[
              _styles['text-white'],
              _styles.defaultFontStyleBold,
              _styles.textCenter,
              _styles.textFifteen
            ]}>
              { i18n.t('auth.reset_password') }
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[_styles['mt-20']]}>
          {
            !serverLoginErrors
              ? <Text></Text>
              : serverLoginErrors.map((fieldError: string, index: number) => {
                return (
                  <Text
                    key={index}
                    style={[
                      _styles['text-red-500'],
                      _styles['mt-1'],
                      _styles.defaultFontStyleSemiBold
                    ]}
                  >
                    {fieldError}
                  </Text>
                );
              })
          }
        </View>
      </View>
    </View>
  );
};
