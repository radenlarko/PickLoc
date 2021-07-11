import React, { useState, useEffect, useCallback } from 'react';
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
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoder-reborn';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { BgApp, ImageSample } from '../assets/image';
import Header from '../components/Header';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const AddScreen = ({ navigation }) => {
  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  });
  const [address, setAddress] = useState('');
  const [image, setImage] = useState({
    name: '',
    uri: '',
    type: '',
  });
  const [remarks, setRemark] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(2000).then(() => {
      getMyLocation();
      setImage({
        name: '',
        uri: '',
        type: '',
      });
      setRemark('');
      setRefresh(false);
    });
  }, [getMyLocation, setRefresh]);

  const getMyLocation = useCallback(async () => {
    setRefresh(true);
    try {
      const response = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });

      if (response.code === 'CANCELLED') {
        return Promise.reject(response);
      }

      if (response.code === 'UNAVAILABLE') {
        return Promise.reject(response);
      }

      if (response.code === 'TIMEOUT') {
        return Promise.reject(response);
      }

      if (response.code === 'UNAUTHORIZED') {
        return Promise.reject(response);
      }

      console.log('response: ', response);
      setCoordinate({
        ...coordinate,
        latitude: response.latitude,
        longitude: response.longitude,
      });
      getAddress(response.latitude, response.longitude);
      setRefresh(false);

      return Promise.resolve(response);
    } catch (error) {
      const { code, message } = error;
      console.warn(code, message);
      if (code === 'CANCELLED') {
        Alert.alert(
          'CANCELLED',
          'Location cancelled by user or by another request',
        );
      }
      if (code === 'UNAVAILABLE') {
        Alert.alert(
          'UNAVAILABLE',
          'Location service is disabled or unavailable',
          [{ text: 'Ok', onPress: () => GetLocation.openGpsSettings() }],
        );
      }
      if (code === 'TIMEOUT') {
        Alert.alert('TIMEOUT', 'Location request timed out');
      }
      if (code === 'UNAUTHORIZED') {
        Alert.alert(
          'UNAUTHORIZED',
          'Authorization denied, please enable location permission',
          [{ text: 'Ok', onPress: () => GetLocation.openAppSettings() }],
        );
      }
      setRefresh(false);
    }
  }, [setRefresh, setCoordinate, getAddress]);

  const getAddress = useCallback(async (lat, lng) => {
    try {
      const response = await Geocoder.geocodePosition({ lat, lng });

      if (lat === null || coordinate.longitude === lng) {
        return Promise.reject(response);
      }

      console.log(response[0].formattedAddress);
      setAddress(response[0].formattedAddress);

      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
    }
  }, [setAddress]);

  useEffect(() => {
    getMyLocation();
    getAddress();
  }, [getMyLocation]);

  const takePhotoFromCamera = async () => {
    await ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(photo => {
        console.log(photo);
        const uploadUri = photo.path;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        setImage({
          ...image,
          name: fileName,
          uri: photo.path,
          type: photo.mime,
        });
      })
      .then(bs.current.snapTo(1))
      .catch(err => {
        console.log(err);
      });
  };

  const choosePhotoFromLibrary = async () => {
    await ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(photo => {
        console.log(photo);
        const uploadUri = photo.path;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        setImage({
          ...image,
          name: fileName,
          uri: photo.path,
          type: photo.mime,
        });
      })
      .then(bs.current.snapTo(1))
      .catch(err => {
        console.log(err);
      });
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.panelButton,
          { backgroundColor: '#949494', marginTop: 20 },
        ]}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
      <View style={{ height: 140 }}></View>
    </View>
  );

  const renderHeader = () => (
    <TouchableOpacity
      onPress={() => bs.current.snapTo(1)}
      style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </TouchableOpacity>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const handleSubmit = async () => {
    if (coordinate.latitude === 0 || !address || !image.uri || !remarks) {
      Alert.alert('Error!!', 'Field cannot be empty!');
      return null;
    }

    setLoading(true);

    const data = new FormData();
    data.append('title', address);
    data.append('body', remarks);
    data.append('image', image);

    try {
      const response = await fetch('http://localhost:4000/v1/blog/post', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const dataJson = await response.json();

      console.log('pos berhasil: ', dataJson);
      setImage({
        name: '',
        uri: '',
        type: '',
      });
      setRemark('');
      setLoading(false);
      navigation.navigate('Home');
    } catch (err) {
      console.log('error post: ', err);
      setLoading(false);
    }
  };

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
      <Animated.ScrollView
        style={[
          styles.mainContainer,
          { opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) },
        ]}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }>
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.map, styles.mapContainer]}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={coordinate}>
              <Marker
                coordinate={{
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                }}
              />
            </MapView>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: -16, elevation: 7 }}>
          <TouchableOpacity onPress={getMyLocation} disabled={refresh}>
            {refresh ? (
              <View style={[styles.refreshMaps, { backgroundColor: '#b0b0b0' }]}>
                <Text style={{ color: 'white', fontSize: 11 }}>
                  Refresh Maps
                </Text>
              </View>
            ) : (
              <View style={styles.refreshMaps}>
                <Text style={{ color: 'white', fontSize: 11 }}>
                  Refresh Maps
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text>Latitude: </Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {coordinate.latitude}
              </Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text>Longitude: </Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {coordinate.longitude}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 12, color: 'grey' }}>
              {address.length === 0
                ? 'no address, please connect to the internet.'
                : address}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ImageBackground
            source={{
              uri:
                image.uri.length === 0
                  ? 'http://localhost:4000/images/take-photo.jpg'
                  : image.uri,
            }}
            style={styles.containerAddPhoto}>
            <TouchableOpacity
              style={styles.contentAddPhoto}
              onPress={() => bs.current.snapTo(0)}>
              <MaterialCommunityIcons name="camera" size={30} color="white" />
            </TouchableOpacity>
          </ImageBackground>
          <View style={{ marginTop: 20 }}>
            <TextInput
              placeholder="remarks"
              value={remarks}
              autoCorrect={false}
              onChangeText={value => setRemark(value)}
              multiline
              maxLength={120}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? (
              <View style={[styles.button, {backgroundColor: '#b0b0b0'}]}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <View style={styles.button}>
                <Text style={{ color: 'white' }}>Submit</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ height: 60 }}></View>
      </Animated.ScrollView>
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
    width: screenWidth * 0.28,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#ACC3E6',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  contentAddPhoto: {
    width: screenWidth * 0.23,
    height: 100,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  textInput: {
    width: screenWidth * 0.5,
    padding: 20,
    borderWidth: 1,
    borderColor: '#749DDB',
    borderRadius: 20,
    minHeight: 120,
  },
  panel: {
    padding: 20,
    paddingHorizontal: screenWidth * 0.1,
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
    borderRadius: 30,
    backgroundColor: '#c28a6b',
    alignItems: 'center',
    marginVertical: 4,
  },
  panelButtonTitle: {
    fontSize: 17,
    color: 'white',
  },
});
