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
  TextInput,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { BgApp, ImageSample } from '../assets/image';
import Header from '../components/Header';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

const AddScreen = () => {
  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  });
  const [address, setAddress] = useState('Tes pos react native');
  const [image, setImage] = useState({
    path: '',
    data: null,
  });
  const [remarks, setRemark] = useState('');

  const takePhotoFromCamera = async () => {
    await ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.7,
    })
      .then(photo => {
        console.log(photo);
        setImage({
          ...image,
          path: photo.path,
          data: photo.data,
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
      includeBase64: true,
      compressImageQuality: 0.7,
    })
      .then(photo => {
        console.log(photo);
        setImage({
          ...image,
          path: photo.path,
          data: photo.data,
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
    // Alert.alert(
    //   'Data Submit',
    //   `${address}, ${remarks}, ${String(image.data)}`,
    // );
    const data = new FormData();
    data.append('title', 'tes body sjhsjhs');
    data.append('body', 'tes body dfssf');
    data.append('image', image.data);

    try {
      const response = await fetch('http://localhost:4000/v1/blog/post', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const feedBack = await response.json();

      console.log('pos berhasil: ', feedBack);
    } catch (err) {
      console.log('error post: ', err);
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
        ]}>
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
          <TouchableOpacity style={styles.refreshMaps}>
            <Text style={{ color: 'white', fontSize: 11 }}>Refresh Maps</Text>
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
                image.path.length === 0
                  ? 'http://localhost:4000/images/take-photo.jpg'
                  : image.path,
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
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={{ color: 'white' }}>Submit</Text>
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
