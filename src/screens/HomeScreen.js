import React, { useContext, useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BgApp, LogoPickLocAtom } from '../assets/image';
import { AuthContext } from '../store/AuthContext';
import moment from 'moment';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [perPage, setPerpage] = useState(5);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getData();
      setRefreshing(false)
    });
  }, [getData, perPage, totalData]);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/v1/blog/posts?page=1&perPage=${perPage}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
      );

      const dataJson = await response.json();

      console.log(dataJson);

      setData(dataJson.data);
      setTotalData(dataJson.total_data);
      setLoading(false);
    } catch (error) {
      console.log('get data: ', error);
      Alert.alert(String(error));
      setLoading(false);
    }
  }, [perPage, setData, setTotalData, setLoading]);

  useEffect(() => {
    getData();
  }, [getData]);

  const updatePerPage = () => {
    setPerpage(perPage + 5);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', { item: item })}>
        <View style={styles.listDataContainer}>
          <Image
            source={{
              uri: `http://localhost:4000/${item.image}`,
            }}
            style={styles.listDataImage}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
              {moment(item.createdAt).format('lll')}
            </Text>
            <Text style={{ fontSize: 10, color: '#9E8A7F' }}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListFooterComponent = () => {
    return (
      <>
        {perPage >= totalData ? null : (
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <TouchableOpacity
              style={styles.buttonLoad}
              onPress={updatePerPage}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ color: 'white' }}>Load Data</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 60 }}></View>
      </>
    );
  };

  return (
    <ImageBackground source={BgApp} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={LogoPickLocAtom} alt="pick loc small" />
          <View style={{ marginLeft: 12 }}>
            <Text>Welcome</Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginTop: -3,
                textTransform: 'capitalize',
              }}>
              {authContext.userName}
            </Text>
          </View>
        </View>
        <View style={styles.dateNow}>
          <Text style={{ color: 'white', fontSize: 18 }}>
            {moment().format('ll')}
          </Text>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.filter}>
            <Text style={{ color: 'white' }}>{moment().format('L')}</Text>
          </View>
          <Text>-</Text>
          <View style={styles.filter}>
            <Text style={{ color: 'white' }}>{moment().format('L')}</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.buttonFilter}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {data.length === 0 ? null : (
        <FlatList
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          ListFooterComponent={ListFooterComponent}
        />
      )}
      <View style={{ height: screenHeight * 0.12 }}></View>
    </ImageBackground>
  );
};

export default HomeScreen;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    paddingHorizontal: screenWidth * 0.1,
    paddingTop: 45,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateNow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 134,
    height: 34,
    borderRadius: 20,
    backgroundColor: '#59463B',
    marginTop: 17,
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between',
  },
  filter: {
    width: 124,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#ACC3E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFilter: {
    width: 24,
    height: 24,
    borderRadius: 10,
    backgroundColor: '#59463B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    paddingHorizontal: screenWidth * 0.1,
    paddingTop: 10,
  },
  listDataContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D8CBC4',
    paddingBottom: 8,
  },
  listDataImage: {
    width: 43,
    height: 43,
    borderRadius: 22,
    resizeMode: 'cover',
  },
  buttonLoad: {
    width: 120,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#59463B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
