import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import currency from 'currency.js';
import { AppDispatch } from '../store';
import { getBills } from '../store/reducers/BillsReducer';
import ActionQueue from '../utils/ActionQueue';
import _styles from '../css/styles';
import BillCard from '../components/BillCard';
import { hasOwnProperty } from '../utils';

type Bill = {
  id: number,
  name: string,
  description: string,
  value: number,
  // eslint-disable-next-line camelcase
  created_at: string,
  // eslint-disable-next-line camelcase
  issue_date: string,
  categories: [{
    'name': string
  }]
}

type BillsType = Array<Bill>;

type BillsSeparatedByDate = {
  [index: string]: {
    content: Array<Object>,
    meta: {
      total: number
    }
  }
}

export default function Bills () {
  const iconsMap: any = {
    food: 'pizza-outline',
    health: 'fitness-outline',
    education: 'school-outline',
    entertainment: 'game-controller-outline',
    security: 'shield-checkmark-outline',
    home: 'home-outline',
    transport: 'bus-outline',
    business: 'briefcase-outline',
    pet: 'paw-outline'
  };

  type AvailableFilters = '' | 'lastBills' | 'previousMonth';

  const dispatch = useDispatch<AppDispatch>();
  const [billsForView, setBillsForView] = useState<Array<Object>>([]);
  const [bills, setBills] = useState<BillsType>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(100);
  const [filter, setFilter] = useState<AvailableFilters>('lastBills');
  const [notificationCardMessage, setNotificationCardMessage] = useState<string>('');
  const wasFilterChanged = useRef(false);

  const changeNotificationCardMessage = (filter: AvailableFilters, bills: any) => {
    const getNotificationMessage: any = {
      lastBills: () => setNotificationCardMessage(getLastBillsMessage(bills)),
      previousMonth: () => setNotificationCardMessage(getLastBillsMessage(bills))
    };

    getNotificationMessage[filter]();
  };

  const getLastBillsMessage = (bills: any) => {
    const firstBill = bills[0][1].content[0];
    const lastBillGroup = bills[bills.length - 1][1];
    const lastBill = lastBillGroup.content[lastBillGroup.content.length - 1];

    const firstBillDate = moment(firstBill.issue_date).format('DD/MM/YYYY');
    const lastBillDate = moment(lastBill.issue_date).format('DD/MM/YYYY');

    let billsTotal = 0;

    bills.forEach((billGroup: any) => {
      billsTotal += billGroup[1].meta.total;
    });

    const billsTotalForView: string = convertMoneyForView(billsTotal);

    return `You spent ${billsTotalForView} between ${lastBillDate} until ${firstBillDate}`;
  };

  const prepareBillsForView = (bills: BillsType) => {
    const billsSeparatedByDate: BillsSeparatedByDate = {};

    bills.forEach((bill) => {
      const billIssueDate = moment(bill.issue_date).format('dddd,  D MMM');

      if (!hasOwnProperty(billsSeparatedByDate, billIssueDate)) {
        const meta = {
          total: 0
        };

        billsSeparatedByDate[billIssueDate] = { content: [], meta: meta };
      }

      billsSeparatedByDate[billIssueDate].content.push(bill);
      billsSeparatedByDate[billIssueDate].meta.total += bill.value;
    });

    return Object.entries(billsSeparatedByDate);
  };

  const getUserBills = () => {
    ActionQueue.pushAnAction('getBills', () => getBills({ page: currentPage }));

    return dispatch(getBills({ page: currentPage, filter }))
      .then((response: any) => {
        setBills([...bills, ...response.payload.data]);

        const preparedBillsForView = prepareBillsForView(response.payload.data);

        setBillsForView([...billsForView, ...preparedBillsForView]);
        changeNotificationCardMessage(filter, preparedBillsForView);

        setLastPage(response.payload.last_page);
      });
  };

  const fetchMoreBills = () => {
    if (currentPage <= lastPage) {
      getUserBills();

      setCurrentPage(currentPage + 1);
    }
  };

  const convertMoneyForView = (amount: number) => {
    const options = { separator: ',', precision: 2, fromCents: true, symbol: '€ ' };

    return currency(amount, options).format();
  };

  useEffect(() => {
    getUserBills()
      .then(() => {
        setCurrentPage(2);
      });
  }, []);

  useEffect(() => {
    // changeNotificationCardMessage(filter);

    if (billsForView.length === 0 && wasFilterChanged.current) {
      wasFilterChanged.current = false;

      getUserBills()
        .then(() => {
          setCurrentPage(2);
        });
    }
  }, [billsForView]);

  useEffect(() => {
    setCurrentPage(1);
    setBills([]);
    setBillsForView([]);

    wasFilterChanged.current = true;
  }, [filter]);

  return (
    <View
      style={[
        _styles.flexOne,
        _styles.notchIgnore,
        _styles['bg-white']
      ]}>
      <View style={[_styles.itemsCenter, _styles.justifyCenter]}>
        <View
          style={[
            _styles.flexRow,
            styles.notificationCard,
            _styles.itemsCenter]}
        >
          <Image
            style={[styles.notificationBell]}
            source={require('../images/notifications-circle.png')}
          />
          <Text
            style={[
              styles.notificationCardText,
              _styles.defaultFontStyleBold,
              _styles.flexOne,
              _styles['text-white']
            ]}
          >
            { notificationCardMessage }
          </Text>
        </View>
        <View style={[styles.history, _styles.itemsCenter]}>
          <View style={[_styles.flexOne, { width: '85%' }, { overflow: 'hidden' }]}>
            <View>
              <View style={[_styles.flexRow, _styles.itemsCenter, _styles.justifyBetween]}>
                <Text
                  style={[
                    _styles.defaultFontStyleBold,
                    _styles.textThirty,
                    _styles['text-black-alpha-80'],
                    _styles['mt-25']
                  ]}
                >
                  History
                </Text>
                <View style={[_styles['mt-30'], _styles.flexRow, _styles.itemsCenter]}>
                  <Text
                    style={[
                      _styles.defaultFontStyleSemiBold,
                      _styles['text-black-alpha-80'],
                      _styles.textFifteen
                    ]}
                  >
                    Filters
                  </Text>
                  <Picker
                    style={[{ paddingHorizontal: 20 }]}
                    dropdownIconColor="#323232"
                    selectedValue={filter}
                    onValueChange={(itemValue, itemIndex) => {
                      setFilter(itemValue as AvailableFilters);
                    }}
                  >
                    <Picker.Item label="Last Bills" value="lastBills" />
                    <Picker.Item label="Previous Month" value="previousMonth" />
                  </Picker>
                </View>
              </View>

              {bills
                ? <FlatList
                  style={[_styles['mt-20']]}
                  contentContainerStyle={[
                    { overflow: 'hidden' },
                    { paddingBottom: 80 }
                  ]}
                  extraData={bills}
                  data={billsForView}
                  keyExtractor={(bill, index) => index.toString()}
                  onEndReached={fetchMoreBills}
                  onEndReachedThreshold={0.5}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }: any) => (
                    <View style={[_styles['mt-20']]}>
                      <View style={[_styles.flexRow, _styles.justifyBetween]}>
                        <Text
                          style={[
                            _styles.defaultFontStyleSemiBold,
                            _styles['text-light-gray-900'],
                            _styles.textFifteen
                          ]}
                        >
                          {item[0]}
                        </Text>
                        <Text
                          style={[
                            _styles.defaultFontStyleSemiBold,
                            _styles['text-light-gray-900']
                          ]}
                        >
                          {convertMoneyForView(item[1].meta.total)}
                        </Text>
                      </View>

                      <View style={[_styles['mt-20']]}>
                        {
                          item[1].content.map((bill: Bill) => {
                            return (
                              <View key={bill.id} style={[_styles['mb-25']]}>
                                <BillCard
                                  key={bill.id}
                                  iconName={iconsMap[bill.categories[0].name.toLowerCase()]}
                                  placeName={bill.name}
                                  categoryName={bill.categories[0].name}
                                  billValue={convertMoneyForView(bill.value)}
                                />
                              </View>
                            );
                          })
                        }
                      </View>
                    </View>
                  )}
                />
                : <View></View>
              }
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
    borderRadius: 20
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },

  border: {
    borderWidth: 1,
    borderColor: '#000'
  }
});
