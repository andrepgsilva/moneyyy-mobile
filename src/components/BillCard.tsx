import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import _styles from '../css/styles';

type BillCardAttributes = {
  iconName: any,
  placeName: string,
  categoryName: string,
  billValue: string,
}

export default function BillCard ({ iconName, placeName, categoryName, billValue }: BillCardAttributes) {
  return (
    <View style={[styles['w-full'], _styles.flexRow, _styles.justifyBetween]}>
      <View style={[_styles.flexRow]}>
        <View style={[_styles.justifyCenter]}>
          <Ionicons name={iconName} color={_styles['text-main-color'].color} size={40} />
        </View>

        <View style={[_styles['ml-10']]}>
          <Text style={[_styles.defaultFontStyleSemiBold, _styles['text-black-alpha-80'], styles['text-fifteen']]}>{placeName}</Text>
          <Text style={[_styles.defaultFontStyleSemiBold, _styles['text-light-gray-900'], styles['text-fifteen'], _styles['mt-4']]}>{categoryName}</Text>
        </View>
      </View>

      <Text style={[_styles.defaultFontStyleSemiBold, _styles.textRight, _styles['text-black-alpha-80'], styles['text-fifteen']]}>{billValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  'text-fifteen': {
    fontSize: 15
  },

  'w-full': {
    width: '100%'
  }
});
