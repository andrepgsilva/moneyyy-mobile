import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getBills } from '../store/reducers/BillsReducer';
import ActionQueue from '../utils/ActionQueue';

import _styles from '../css/styles';

export default function Content () {
  const dispatch = useDispatch<AppDispatch>();
  const [bills, setBills] = useState<Array<Object>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(100);

  const getUserBills = () => {
    ActionQueue.pushAnAction('getBills', () => getBills({ page: currentPage }));

    return dispatch(getBills({ page: currentPage }))
      .then((response: any) => {
        setBills([...bills, ...response.payload.data]);
        setLastPage(response.payload.last_page);
      });
  };

  const fetchMoreBills = () => {
    if (currentPage <= lastPage) {
      getUserBills();

      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    getUserBills()
      .then(() => {
        setCurrentPage(2);
      });
  }, []);

  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: '#FBFBF8',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        paddingBottom: 20
      }}
      data={bills}
      keyExtractor={(bill, index) => index.toString()}
      onEndReached={fetchMoreBills}
      onEndReachedThreshold={0.5}
      renderItem={({ item }: any) => (
        <View
          style={{
            marginTop: 10
          }}>
            <Text>{item.name}</Text>
        </View>
      )}
    />
  );
}
