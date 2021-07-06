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
  TextInput,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { BgApp, ImageSample } from '../assets/image';
import Header from '../components/Header';

const AddScreen = () => {
  return (
    <ImageBackground source={BgApp} style={styles.container}>
      <Header label="Add Data" actionButton={() => Alert.alert('Clicked')} />
      <ScrollView style={styles.mainContainer}>
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.map, styles.mapContainer]}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: -6.4155731,
                longitude: 106.7989004,
                latitudeDelta: 0.006,
                longitudeDelta: 0.006,
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
        <View style={{ alignItems: 'center', marginTop: -16, elevation: 7 }}>
          <TouchableOpacity style={styles.refreshMaps}>
            <Text style={{ color: 'white', fontSize: 11 }}>Refresh Maps</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text>Latitude: </Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                -6.4123416
              </Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text>Latitude: </Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                -6.4123416
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 12, color: 'grey' }}>
              Jl. H Ganeng No. 64 Cipayung, Depok
            </Text>
          </View>
        </View>
        <View style={styles.containerAddPhoto}>
          <TouchableOpacity style={styles.contentAddPhoto}>
            <Text style={{ color: 'white' }}>add a photo</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <TextInput
            placeholder="remarks"
            multiline
            maxLength={120}
            style={styles.textInput}
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: 'white' }}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 60 }}></View>
      </ScrollView>
      <View style={{ height: screenHeight * 0.12 }}></View>
    </ImageBackground>
  );
};

export default AddScreen;

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
  refreshMaps: {
    width: 97,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#996F57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 115,
    height: 115,
    backgroundColor: '#59463B',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAddPhoto: {
    marginTop: 20,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#ACC3E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentAddPhoto: {
    width: screenWidth * 0.7,
    height: 80,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#749DDB',
    borderRadius: 20,
    minHeight: 120,
  },
});
