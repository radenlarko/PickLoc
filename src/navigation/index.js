import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../store/AuthContext';
import Tabs from './tabs';
import Stacks from './stacks';

const Navigation = () => {
  const authContext = useContext(AuthContext);

  console.log('token navigation: ', authContext.userToken);

  return (
    <NavigationContainer>
      {authContext.userToken ? <Tabs /> : <Stacks />}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
