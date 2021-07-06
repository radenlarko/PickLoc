import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BgApp, ImageSample } from '../assets/image';
import Header from '../components/Header';

const DetailsScreen = ({navigation}) => {
  return (
    <ImageBackground source={BgApp} style={styles.container}>
      <Header
        label="Details"
        button={
          <MaterialCommunityIcons
            name="chevron-left"
            size={42}
            color="#59463B"
          />
        }
        actionButton={() => navigation.goBack()}
      />
      <ScrollView style={styles.mainContainer}>
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.map, styles.mapContainer]}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: -6.4155731,
                longitude: 106.7989004,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
              <Marker
                coordinate={{
                  latitude: -6.4155731,
                  longitude: 106.7989004,
                }}
              />
            </MapView>
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.dateContainer}>
            <Text style={{ color: '#59463B' }}>Jun 30, 2021</Text>
            <Text
              style={{ color: '#59463B', fontSize: 20, fontWeight: 'bold' }}>
              11:49 AM
            </Text>
          </View>
          <Image
            source={ImageSample}
            alt="picture-sample"
            style={styles.picture}
          />
        </View>
        <View style={styles.containerContent}>
          <View style={{ height: 120, justifyContent: 'space-between' }}>
            <View style={styles.coordinateContainer}>
              <Text style={styles.coordinateTitle}>Latitude :</Text>
              <Text style={styles.coordinateBody}>-6.4123416</Text>
            </View>
            <View
              style={[
                styles.coordinateContainer,
                { backgroundColor: '#CA845D' },
              ]}>
              <Text style={styles.coordinateTitle}>Longitude :</Text>
              <Text style={styles.coordinateBody}>-106.8060391</Text>
            </View>
          </View>
          <View style={styles.containerAddress}>
            <Text style={styles.address}>
              Jl. H Ganeng No. 64 Cipayung, Depok
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.remarksContainer}>
            <Text>Remarks : </Text>
            <Text>
              Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang
              ditempatkan untuk mendemostrasikan elemen grafis atau presentasi
              visual seperti font, tipografi, dan tata letak.
            </Text>
          </View>
        </View>
        <View style={{ height: 60 }}></View>
      </ScrollView>
      <View style={{ height: screenHeight * 0.12 }}></View>
    </ImageBackground>
  );
};

export default DetailsScreen;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  mainContainer: {
    paddingHorizontal: screenWidth * 0.1,
  },
  mapContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  map: {
    width: screenWidth * 0.78,
    height: 217,
  },
  containerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dateContainer: {
    backgroundColor: '#ACC3E6',
    width: screenWidth * 0.32,
    height: 136,
    borderRadius: 30,
    justifyContent: 'center',
    padding: 10,
  },
  picture: {
    width: screenWidth * 0.446,
    height: 136,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  coordinateContainer: {
    backgroundColor: '#996F57',
    width: screenWidth * 0.446,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  coordinateTitle: {
    color: 'white',
    fontSize: 12,
  },
  coordinateBody: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerAddress: {
    borderWidth: 2,
    borderColor: '#59463B',
    width: screenWidth * 0.32,
    height: 120,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
  },
  address: {
    fontSize: 11,
    color: '#59463B',
    textAlign: 'center',
  },
  remarksContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    width: screenWidth * 0.78,
    minHeight: 100,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
