import React, { useState } from 'react';
import _styles from '../css/styles';
import { View, Text, StyleSheet } from 'react-native';

export default function Content () {
  return (
    <View
      style={styles.container}
    >
      <Text>This is the content page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
});