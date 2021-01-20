import React, { useState } from 'react';
import _styles from '../css/styles';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { hasOwnProperty } from '../utils';
import i18n from '../i18n';
import { useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch } from '../store';
import { login, clearServerAuthErrors, serverLoginErrorsSelector } from '../store/reducers/AuthReducer';
import ActionQueue from '../utils/ActionQueue';

export default function Login () {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const serverLoginErrors = useSelector(serverLoginErrorsSelector);

  const goToSignUp = () => {
    dispatch(clearServerAuthErrors());
    navigation.navigate('Signup');
  };

  const goToForgotPassword = () => {
    dispatch(clearServerAuthErrors());
    navigation.navigate('ForgotPassword');
  };

  const authenticateUser = () => {
    dispatch(clearServerAuthErrors());

    dispatch(login({ email, password }))
      .then((asyncThunkResponse: object) => {
        const hasNotAserverError = !hasOwnProperty(asyncThunkResponse, 'error');
        const hasFormFieldsErrors = !hasOwnProperty(asyncThunkResponse, 'errors');

        if (hasNotAserverError && hasFormFieldsErrors) {
          // navigation.navigate('Bills');
        }
      });
  };

  const isButtonDisabled = email === '' || password === '';
  const disabledClass = isButtonDisabled ? _styles['bg-main-color-light'] : _styles['bg-main-color'];

  return (
    <View
      style={[_styles.flexOne, _styles['bg-honeydew'], _styles.justifyAround]}
    >
      <View style={[_styles.notchIgnore]}>
        <View style={[_styles.itemsCenter]}>
          <Image
            style={styles.logo}
            source={require('../images/moneyyy-logo.png')}
          />
        </View>
        <View style={[_styles.itemsCenter, _styles['mt-10']]}>
          <Text style={[_styles.textThirty, _styles.defaultFontStyleBold, _styles['mt-10']]}>
            Moneyyy
          </Text>
        </View>
      </View>
      <View style={[_styles.itemsCenter]}>
        <View style={[{ width: '85%' }, _styles['-mt-80']]}>
          <Text
            style={[_styles.defaultFontStyleBold, _styles.textTwenty, _styles['text-gray-100']]}
          >
            { i18n.t('auth.please_login') }
          </Text>
          <View>
            <Ionicons
              name="mail-outline"
              color={_styles['text-cool-gray-400'].color}
              size={20}
              style={[_styles.positionAbsolute, { top: 45 }, { left: 20 }, _styles.zIndexTwo]}
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
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
              placeholder={ i18n.t('auth.email_address') }
              placeholderTextColor={_styles['text-cool-gray-100'].color}
            ></TextInput>
          </View>
          <View>
            <Ionicons
              name="md-lock-open-outline"
              color={_styles['text-cool-gray-400'].color}
              size={20}
              style={[_styles.positionAbsolute, { top: 44 }, { left: 20 }, _styles.zIndexTwo]}
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
              placeholder={ i18n.t('auth.password') }
              secureTextEntry={true}
              placeholderTextColor={_styles['text-cool-gray-100'].color}
            ></TextInput>
          </View>
          <TouchableOpacity
            onPress={authenticateUser}
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
              { i18n.t('auth.login') }
            </Text>
          </TouchableOpacity>
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
          <View style={[_styles['mt-20'], _styles.justifyBetween, _styles.flexRow]}>
            <TouchableOpacity onPress={() => goToSignUp()}>
              <Text
                style={[_styles['text-cool-gray-600'], _styles.defaultFontStyleSemiBold]}
              >
                {i18n.t('auth.sign_up')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToForgotPassword()}>
              <Text
                style={[_styles['text-cool-gray-600'], _styles.defaultFontStyleSemiBold]}
              >
                { i18n.t('auth.forgot_password_question') }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 165,
    height: 92
  }
});
