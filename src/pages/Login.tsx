import React from 'react';
import _styles from '../css/styles';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from '@react-navigation/native';
import i18n from '../i18n';

export default function Login () {
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
            { i18n.t('login.please_login') }
          </Text>
          <View>
            <Ionicons
              name="mail-outline"
              color={_styles['text-cool-gray-400'].color}
              size={20}
              style={[_styles.positionAbsolute, { top: 45 }, { left: 20 }, _styles.zIndexTwo]}
            />
            <TextInput
              style={[_styles.zIndexOne, _styles['mt-25'], _styles['pl-50'], _styles['pt-16'], _styles['pb-16'], _styles['bg-white'], _styles['w-full'], _styles.brThirty, _styles.defaultFontStyleSemiBold]}
              placeholder={ i18n.t('login.email_or_username') }
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
              style={[_styles.zIndexOne, _styles['mt-25'], _styles['pl-50'], _styles['pt-16'], _styles['pb-16'], _styles['bg-white'], _styles['w-full'], _styles.brThirty, _styles.defaultFontStyleSemiBold]}
              placeholder={ i18n.t('login.password') }
              secureTextEntry={true}
              placeholderTextColor={_styles['text-cool-gray-100'].color}
            ></TextInput>
          </View>
          <TouchableOpacity
            style={[_styles['mt-25'], _styles['pt-16'], _styles['pb-16'], _styles['bg-main-color'], _styles.brThirty]}
            onPress={() => alert('login')}
          >
            <Text style={[_styles['text-white'], _styles.defaultFontStyleBold, _styles.textCenter, _styles.textFifteen]}>{ i18n.t('login.login') }</Text>
          </TouchableOpacity>
          <View style={[_styles['mt-40'], _styles.justifyBetween, _styles.flexRow]}>
            <Link to={'#'}><Text style={[_styles['text-cool-gray-400'], _styles.defaultFontStyleSemiBold]}>{ i18n.t('login.sign_up') }</Text></Link>
            <Link to={'#'}><Text style={[_styles['text-cool-gray-400'], _styles.defaultFontStyleSemiBold]}>{ i18n.t('login.forgot_password') }</Text></Link>
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
