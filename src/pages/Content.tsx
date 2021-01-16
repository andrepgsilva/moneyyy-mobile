import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getBills, billsSelector } from '../store/reducers/BillsReducer';
import ActionQueue from '../utils/ActionQueue';

import _styles from '../css/styles';

type Bill = {
  categories: Array<Object>,
  // eslint-disable-next-line camelcase
  created_at: string,
  description: string,
  id: number,
  name: string,
  value: number
};

export default function Content () {
  const dispatch = useDispatch<AppDispatch>();
  const bills = useSelector(billsSelector);

  const getUserBills = () => {
    ActionQueue.pushAnAction('getBills', () => getBills());

    dispatch(getBills())
      .then(() => {
        console.log('Trying to get bills!');
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      // ActionQueue.pushAnAction('getBills', () => getBills());

      // dispatch(getBills());
      getUserBills();
    }, [])
  );

  return (
    <View>
      <View>
        {
          bills
            ? bills.map((bill: Bill) => {
                return <Text key={bill.id}>{ bill.name }</Text>;
              })
            : <Text></Text>
        }

<TouchableOpacity
            onPress={getUserBills}
            style={[
              _styles['mt-25'],
              _styles['pt-16'],
              _styles['pb-16'],
              _styles.brThirty
            ]}
          >
            <Text style={[
              _styles['text-white'],
              _styles.defaultFontStyleBold,
              _styles.textCenter,
              _styles.textFifteen
            ]}>
              Get My Bills
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
