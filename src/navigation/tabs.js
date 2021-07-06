import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DetailsScreen, HomeScreen, AddScreen, AccountScreen, DetailsScreen2 } from '../screens';
import TabBar from '../components/TabBar';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.customTabContainer} onPress={onPress}>
    <View style={[styles.customTabContent, { ...styles.shadow }]}>
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: [styles.bottomTabContainer, { ...styles.shadow }],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBar
              icon="home-circle"
              styleIcon={focused ? '#59463B' : '#ACC3E6'}
              label="Home"
              styleLabel={[
                styles.labelBottomMenu,
                { color: focused ? '#59463B' : '#ACC3E6' },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="plus" size={40} color="white" />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBar
              icon="account-circle"
              styleIcon={focused ? '#59463B' : '#ACC3E6'}
              label="Account"
              styleLabel={[
                styles.labelBottomMenu,
                { color: focused ? '#59463B' : '#ACC3E6' },
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen2}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Details2"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  customTabContainer: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customTabContent: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#59463B',
  },
  bottomTabContainer: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 80,
  },
  labelBottomMenu: {
    fontSize: 12,
    marginTop: -4,
  },
});

export default Tabs;
