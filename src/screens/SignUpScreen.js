import React, { useState, useEffect } from 'react';
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

const SignUpScreen = ({ navigation }) => {
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState('close');

  const _keyboardDidShow = () => setKeyboardStatus('open');
  const _keyboardDidHide = () => setKeyboardStatus('close');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPas] = useState('');

  const handleSignup = () => {
    console.log(`${username} ${email} ${password} ${confirmPass}`);
    Alert.alert(
      'Success!!!',
      `${username} ${email} ${password} ${confirmPass}`
    );
  };

  return (
    <ImageBackground source={BgRoot} style={styles.container}>
      <View style={styles.header}>
        <ScrollView style={{ paddingHorizontal: screenWidth * 0.1 }}>
          <View style={{ height: screenHeight * 0.1 }}></View>
          <Image source={LogoPickLocSmall} />
          <Text style={{ fontSize: 36 }}>Create Account,</Text>
          <Text style={{ color: '#59463B' }}>Sign up to get started!</Text>
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
                value={username}
                onChangeText={(value) => setUsername(value)}
                onEndEditing={(e) => {
                  console.log(e.nativeEvent.text);
                  Alert.alert(String(e.nativeEvent.text));
                }}
                style={styles.textInput}
              />
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={20}
                color="#29D783"
              />
            </View>
            <View style={styles.textInputContainer}>
              <MaterialCommunityIcons name="email" size={26} color="#59463B" />
              <TextInput
                autoCapitalize="none"
                placeholder="email"
                value={email}
                onChangeText={(value) => setEmail(value)}
                onEndEditing={(e) => {
                  console.log(e.nativeEvent.text);
                  Alert.alert(String(e.nativeEvent.text));
                }}
                style={styles.textInput}
              />
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={20}
                color="#29D783"
              />
            </View>
            <View style={styles.textInputContainer}>
              <MaterialCommunityIcons name="lock" size={26} color="#59463B" />
              <TextInput
                autoCapitalize="none"
                secureTextEntry={true}
                placeholder="password"
                value={password}
                onChangeText={(value) => setPassword(value)}
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
              <MaterialCommunityIcons name="lock" size={26} color="#59463B" />
              <TextInput
                autoCapitalize="none"
                secureTextEntry={true}
                placeholder="confirm password"
                value={confirmPass}
                onChangeText={(value) => setConfirmPas(value)}
                onEndEditing={(e) => {
                  console.log(e.nativeEvent.text);
                  Alert.alert(String(e.nativeEvent.text));
                }}
                style={styles.textInput}
              />
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="eye-off-outline"
                  size={20}
                  color="#59463B"
                />
              </TouchableOpacity>
            </View>
          </View>
          {keyboardStatus === 'open' ? null : (
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={handleSignup} style={styles.button}>
                <Text style={{ color: 'white' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        {keyboardStatus === 'open' ? (
          <TouchableOpacity onPress={handleSignup} style={styles.buttonFooter}>
            <Text style={{ color: 'white' }}>Sign Up</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.footerContent}>
            <Text style={styles.labelFooter}>I'm already a member, </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={[styles.labelFooter, { fontWeight: 'bold' }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;

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
});
