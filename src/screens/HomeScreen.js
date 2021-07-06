import React, { useContext } from 'react';
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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BgApp, LogoPickLocAtom } from '../assets/image';
import { AuthContext } from '../store/AuthContext';

const ListData = () => {
  return (
    <View style={styles.listDataContainer}>
      <View style={styles.listDataImage}></View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
          Jun 30, 2021 11:49 AM
        </Text>
        <Text style={{ fontSize: 10, color: '#9E8A7F' }}>
          Jl. H Ganeng No. 64 Cipayung, Depok
        </Text>
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);

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
          <Text style={{ color: 'white', fontSize: 18 }}>Jun 30, 2021</Text>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.filter}>
            <Text style={{ color: 'white' }}>01 - 06 - 2021</Text>
          </View>
          <Text>-</Text>
          <View style={styles.filter}>
            <Text style={{ color: 'white' }}>30 - 06 - 2021</Text>
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
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <ListData />
        </TouchableOpacity>
        <View style={{ height: 60 }}></View>
      </ScrollView>
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
    backgroundColor: '#ACC3E6',
  },
});
