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
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const AddScreen = () => {
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
      <View style={{ height: 140 }}></View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <ImageBackground source={BgApp} style={styles.container}>
      <Header label="Add Data" actionButton={() => Alert.alert('Clicked')} />
      <BottomSheet
        ref={bs}
        snapPoints={[480, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
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
          <TouchableOpacity style={styles.contentAddPhoto} onPress={() => bs.current.snapTo(0)}>
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
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
