import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TabBar = (props) => {
  const { icon, styleIcon, label, styleLabel } = props;
  return (
    <View style={{ alignItems: 'center', top: 8 }}>
      <MaterialCommunityIcons
        name={icon}
        size={32}
        color={styleIcon}
      />
      <Text
        style={styleLabel}>
        {label}
      </Text>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
