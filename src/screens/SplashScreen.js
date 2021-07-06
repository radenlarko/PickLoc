import React, {useEffect} from 'react';
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
  StatusBar,
} from 'react-native';
import { BgRoot, LogoPickLoc } from '../assets/image';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignIn')
    }, 2000)
  })
  return (
    <ImageBackground source={BgRoot} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <View style={styles.header}>
      <Image source={LogoPickLoc} alt="pick-loc-logo" style={styles.logo} />
        <ActivityIndicator
          size="small"
          color="#59463B"
          
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.labelFooter}>
          Powered by <Text style={{ fontWeight: 'bold' }}>Adyawinsa</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  labelFooter: {
    fontSize: 14,
    color: '#59463B',
  },
});
