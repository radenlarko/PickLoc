import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const Header = (props) => {
  const { label, button, actionButton } = props;
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TouchableOpacity onPress={actionButton} style={styles.button}>
        {button}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.1,
  },
  labelContainer: {
    width: screenWidth * 0.8,
    alignItems: 'center',
  },
  label: { 
    fontSize: 20, 
    color: '#59463B' 
  },
  button: { 
    position: 'absolute', 
    marginLeft: screenWidth * 0.07 
  },
});
