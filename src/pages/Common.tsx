import React, { useState } from 'react';
import _styles from '../css/styles';
import { View, Text } from 'react-native';

export default function Common () {
  return (
    <View
      style={[_styles.flexOne]}
    >
      <Text>This is the common page</Text>
    </View>
  );
};
