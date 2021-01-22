import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getBills } from '../store/reducers/BillsReducer';
import ActionQueue from '../utils/ActionQueue';

import _styles from '../css/styles';
import BillCard from '../components/BillCard';

export default function Bills () {
  return (
    <View style={[_styles.flexOne, _styles.notchIgnore, _styles['bg-white']]}>
      <View style={[_styles.itemsCenter, _styles.justifyCenter]}>
        <View style={[_styles.flexRow, styles.notificationCard, _styles.itemsCenter]}>
          <Image
            style={[styles.notificationBell]}
            source={require('../images/notifications-circle.png')}
          />
          <Text 
            style={[styles.notificationCardText, _styles.defaultFontStyleBold, _styles.flexOne, _styles['text-white']]}
          >
            You spent € 1,245.00 between 15/12/2019 until 19/01/2021
          </Text>
        </View>
      <View style={[styles.history, _styles.itemsCenter]}>
        <View style={[_styles.flexOne, {width: '85%'}]}>
          <View>
            <Text style={[_styles.defaultFontStyleBold, styles.historyLead, _styles['mt-25']]}>History</Text>
            
            <View style={[_styles['mt-20']]}>
              <View style={[_styles.flexRow, _styles.justifyBetween]}>
                <Text style={[_styles.defaultFontStyleSemiBold, _styles['text-light-gray-900'], {fontSize: 15}]}>Today, 19 Jan</Text>
                <Text style={[_styles.defaultFontStyleSemiBold, _styles['text-light-gray-900']]}>€ 450.00</Text>
              </View>
            </View>

            <View style={[_styles['mt-20']]}>
              <View style={[_styles['mb-15']]}>
                <BillCard
                  iconName="pizza-outline" 
                  placeName="McDonalds's" 
                  categoryName="Food" 
                  billValue="€ 12.00"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      </View>
    </View>  
  );
}

const styles = StyleSheet.create({
  notificationCard: {
    marginTop: 40,
    width: '85%',
    height: 110,
    backgroundColor: '#2ac17c',
    borderRadius: 20,
  },

  notificationBell: {
    width: 60,
    height: 60,
    marginHorizontal: 10
  },

  notificationCardText: {
    fontSize: 15,
    lineHeight: 22
  },

  history: {
    width: '99%',
    height: '70%',
    marginTop: 40,
    borderRadius: 35,
    padding: 10,
 
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },

  historyLead: {
    fontSize: 30,
    color: 'rgba(0, 0, 0, 0.8)'
  },

  border: {
    borderWidth: 1,
    borderColor: "#000"
  },
});