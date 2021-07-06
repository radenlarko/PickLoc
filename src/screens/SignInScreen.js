import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ImageBackground,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import { BgRoot, LogoPickLocSmall } from '../assets/image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../store/AuthContext';

const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState('close');

  const _keyboardDidShow = () => setKeyboardStatus('open');
  const _keyboardDidHide = () => setKeyboardStatus('close');

  const [username, setUsername] = useState({
    value: '',
    valid: true,
    checkValid: false,
  });

  const [password, setPassword] = useState({
    value: '',
    valid: true,
    secure: true,
  });

  const handleUser = (value) => {
    if (value.trim().length >= 4) {
      setUsername({
        ...username,
        value,
        valid: true,
        checkValid: true,
      });
    } else {
      setUsername({
        ...username,
        value,
        valid: false,
        checkValid: false,
      });
    }
  };

  const handlePassword = (value) => {
    if (value.trim().length >= 8) {
      setPassword({
        ...password,
        value,
        valid: true,
      });
    } else {
      setPassword({
        ...password,
        value,
        valid: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setPassword({
      ...password,
      secure: !password.secure,
    });
  };

  const handleSignin = async () => {
    if (username.value.length == 0 || password.value.length == 0) {
      Alert.alert('Error!!', 'Form tidak boleh kosong!', [{ text: 'Okay' }]);
      return null;
    }

    if (!username.valid) {
      Alert.alert('Error!!', 'Username panjang minimal 4 karakter.', [
        { text: 'Okay' },
      ]);
      return null;
    }

    if (!password.valid) {
      Alert.alert('Error!!', 'Password panjang minimal 8 karakter.', [
        { text: 'Okay' },
      ]);
      return null;
    }
    try {
      const login = await signIn(username.value, password.value);

      console.log(`${username.value} ${password.value}`);
      return Promise.resolve(login);
    } catch (error) {
      console.log('error signin: ', error);
    }
  };

  const handleValidUser = (value) => {
    if (value.trim().length >= 4) {
      setUsername({
        ...username,
        valid: true,
        checkValid: true,
      });
    } else {
      setUsername({
        ...username,
        valid: false,
        checkValid: false,
      });
    }
  };

  const handleValidPassword = (value) => {
    if (value.trim().length >= 8) {
      setPassword({
        ...password,
        valid: true,
      });
    } else {
      setPassword({
        ...password,
        valid: false,
      });
    }
  };

  return (
    <ImageBackground source={BgRoot} style={styles.container}>
      <View style={styles.header}>
        <ScrollView style={{ paddingHorizontal: screenWidth * 0.1 }}>
          <View style={{ height: screenHeight * 0.1 }}></View>
          <Image source={LogoPickLocSmall} />
          <Text style={{ fontSize: 36 }}>Welcome,</Text>
          <Text style={{ color: '#59463B' }}>Sign in to continue!</Text>
          <View style={{ marginVertical: 30 }}>
            <View style={styles.textInputContainer}>
              <MaterialCommunityIcons
                name="account-box"
                size={26}
                color="#59463B"
              />
              <TextInput
                autoCapitalize="none"
                placeholder="user name"
                value={username.value}
                onChangeText={(value) => handleUser(value)}
                onEndEditing={(e) => {
                  handleValidUser(e.nativeEvent.text);
                }}
                style={styles.textInput}
              />
              {username.checkValid ? (
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={20}
                  color="#29D783"
                />
              ) : (
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={20}
                  color="rgba(255, 255, 255, 0)"
                />
              )}
            </View>
            {username.valid ? null : (
              <View>
                <Text style={styles.errMsg}>
                  Username panjang minimal 4 karakter.
                </Text>
              </View>
            )}
            <View style={styles.textInputContainer}>
              <MaterialCommunityIcons name="lock" size={26} color="#59463B" />
              <TextInput
                autoCapitalize="none"
                secureTextEntry={password.secure ? true : false}
                placeholder="password"
                value={password.value}
                onChangeText={(value) => handlePassword(value)}
                onEndEditing={(e) => {
                  handleValidPassword(e.nativeEvent.text);
                }}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {password.secure ? (
                  <MaterialCommunityIcons
                    name="eye-off-outline"
                    size={20}
                    color="#59463B"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="eye-outline"
                    size={20}
                    color="#59463B"
                  />
                )}
              </TouchableOpacity>
            </View>
            {password.valid ? null : (
              <View>
                <Text style={styles.errMsg}>
                  Password panjang minimal 8 karakter.
                </Text>
              </View>
            )}
          </View>
          {keyboardStatus === 'open' ? null : (
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={handleSignin} style={styles.button}>
                <Text style={{ color: 'white' }}>Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        {keyboardStatus === 'open' ? (
          <TouchableOpacity onPress={handleSignin} style={styles.buttonFooter}>
            <Text style={{ color: 'white' }}>Sign In</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.footerContent}>
            <Text style={styles.labelFooter}>I'm a new user, </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={[styles.labelFooter, { fontWeight: 'bold' }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default SignInScreen;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flex: 5,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelFooter: {
    fontSize: 14,
    color: '#59463B',
  },
  footerContent: {
    flexDirection: 'row',
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
  button: {
    width: 115,
    height: 115,
    backgroundColor: '#59463B',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFooter: {
    width: 120,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#59463B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errMsg: {
    fontSize: 12,
    color: '#ed0c2a',
  },
});
