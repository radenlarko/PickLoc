import React, { useState } from 'react';
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
  Modal,
  StatusBar,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BgApp, ImageSample } from '../assets/image';
import Header from '../components/Header';
import moment from 'moment';

const DetailsScreen2 = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { item } = route.params;
  const title = item.title;
  const body = item.body;
  const image = item.image;
  const createdAt = item.createdAt;

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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Info', 'Image has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View>
          <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.9)" />
          <View
            style={{
              height: screenHeight,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: `http://localhost:4000/${image}`,
              }}
              alt="picture-sample"
              style={styles.pictureFull}
            />
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              width: screenWidth,
              paddingRight: 20,
              justifyContent: 'center',
              alignItems: 'flex-end',
              position: 'absolute',
            }}
            onPress={() => setModalVisible(!modalVisible)}>
            <MaterialCommunityIcons name="close" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView style={styles.mainContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={{
              uri: `http://localhost:4000/${image}`,
            }}
            alt="picture-sample"
            style={styles.picture}
          />
        </TouchableOpacity>
        <View style={styles.containerContent}>
          <View style={styles.dateContainer}>
            <Text style={{ color: '#59463B' }}>
              {moment(createdAt).format('ll')}
            </Text>
            <Text
              style={{ color: '#59463B', fontSize: 20, fontWeight: 'bold' }}>
              {moment(createdAt).format('LT')}
            </Text>
          </View>
          <View style={[styles.map, styles.mapContainer]}>
            <MapView
              provider={PROVIDER_GOOGLE}
              scrollEnabled={false}
              style={styles.map}
              region={{
                latitude: -6.4155731,
                longitude: 106.7989004,
                latitudeDelta: 0.0055,
                longitudeDelta: 0.0055,
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
            <Text style={styles.address}>{title}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.remarksContainer}>
            <Text>Remarks : </Text>
            <Text>{body}</Text>
          </View>
        </View>
        <View style={{ height: 60 }}></View>
      </ScrollView>
      <View style={{ height: screenHeight * 0.12 }}></View>
    </ImageBackground>
  );
};

export default DetailsScreen2;

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
  },
  map: {
    width: screenWidth * 0.446,
    height: 136,
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
    width: screenWidth * 0.8,
    height: 217,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  pictureFull: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'contain',
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
