import React, { useContext } from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BgApp, ImageSample } from '../assets/image';
import Header from '../components/Header';
import { AuthContext } from '../store/AuthContext';

const AccountScreen = () => {
  const { signOut } = useContext(AuthContext);
  const authContext = useContext(AuthContext);

  console.log('account: ', authContext.userToken);
  return (
    <ImageBackground source={BgApp} style={styles.container}>
      <Header label="Account" actionButton={() => Alert.alert('Clicked')} />
      <ScrollView>
        <View style={styles.containerAccount}>
          <View style={styles.contentAccount}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {authContext.userName}
            </Text>
            <Text style={{ textAlign: 'center' }}>{authContext.userEmail}</Text>
          </View>
          <TouchableOpacity style={styles.logout} onPress={signOut}>
            <MaterialCommunityIcons name="logout" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: screenWidth * 0.1 }}>
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 24 }}>Change Password</Text>
            <View style={{ marginVertical: 20 }}>
              <View style={styles.textInputContainer}>
                <MaterialCommunityIcons
                  name="lock"
                  size={26}
                  color="#59463B"
                />
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry={true}
                  placeholder="password"
                  onEndEditing={(e) => {
                    console.log(e.nativeEvent.text);
                    Alert.alert(String(e.nativeEvent.text));
                  }}
                  style={styles.textInput}
                />
                <MaterialCommunityIcons
                  name="eye-off-outline"
                  size={20}
                  color="#59463B"
                />
              </View>
              <View style={styles.textInputContainer}>
                <MaterialCommunityIcons
                  name="lock"
                  size={26}
                  color="#59463B"
                />
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry={true}
                  placeholder="new password"
                  onEndEditing={(e) => {
                    console.log(e.nativeEvent.text);
                    Alert.alert(String(e.nativeEvent.text));
                  }}
                  style={styles.textInput}
                />
                <MaterialCommunityIcons
                  name="eye-off-outline"
                  size={20}
                  color="#59463B"
                />
              </View>
              <View style={styles.textInputContainer}>
                <MaterialCommunityIcons
                  name="lock"
                  size={26}
                  color="#59463B"
                />
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry={true}
                  placeholder="confirm new password"
                  onEndEditing={(e) => {
                    console.log(e.nativeEvent.text);
                    Alert.alert(String(e.nativeEvent.text));
                  }}
                  style={styles.textInput}
                />
                <MaterialCommunityIcons
                  name="eye-off-outline"
                  size={20}
                  color="#59463B"
                />
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: 'white' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 60 }}></View>
      </ScrollView>
      <View style={{ height: screenHeight * 0.12 }}></View>
    </ImageBackground>
  );
};

export default AccountScreen;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  button: {
    width: 115,
    height: 115,
    backgroundColor: '#59463B',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: screenWidth * 0.1,
  },
  contentAccount: {
    width: screenWidth * 0.8,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#ACC3E6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#749DDB',
    borderRadius: 10,
    paddingHorizontal: 6,
    marginTop: 10,
  },
  textInput: {
    width: screenWidth * 0.62,
    height: 50,
  },
  logout: {
    backgroundColor: '#996F57',
    width: 54,
    height: 33,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -40,
  },
});
