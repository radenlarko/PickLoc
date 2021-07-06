import React, { createContext, useEffect } from 'react';
import { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Users from '../models/User';

const initialLoginState = {
  isLoading: true,
  userName: null,
  userEmail: null,
  userToken: null,
  signIn: () => null,
  signOut: () => null,
  signUp: () => null,
};

export const AuthContext = createContext(initialLoginState);

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userName: action.username,
        userEmail: action.email,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userName: action.username,
        userEmail: action.email,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userName: null,
        userEmail: null,
        userToken: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...prevState,
        userName: action.username,
        userEmail: action.email,
        userToken: action.token,
        isLoading: false,
      };
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      let userName = null;
      let userEmail = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userName = await AsyncStorage.getItem('userName');
        userEmail = await AsyncStorage.getItem('userEmail');
      } catch (err) {
        console.log(err);
      }
      console.log('retrieve token: ', `${userToken} ${userName} ${userEmail}`);
      dispatch({
        type: 'RETRIEVE_TOKEN',
        username: userName,
        email: userEmail,
        token: userToken,
      });
    }, 1000);
  }, []);

  const signIn = async (username, password) => {
    // setUserToken('jadhajd'),
    // setIsLoading(false)

    const foundUser = Users.filter( item => {
      return username == item.username && password == item.password;
    });

    if (foundUser.length == 0) {
      Alert.alert('Error!!', 'Username atau Password salah!', [
        {text: 'Okay'}
      ]);
      return null;
    }

    const userToken = String(foundUser[0].userToken);
    const userName = String(foundUser[0].username);
    const userEmail = String(foundUser[0].email);
    try {
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('userEmail', userEmail);
    } catch (err) {
      console.log('Error Sign In: ', err);
    }
    console.log('data sign in: ', `${userToken} ${userName} ${userEmail}`);
    dispatch({
      type: 'LOGIN',
      username: userName,
      email: userEmail,
      token: userToken,
    });
  };

  const signOut = async () => {
    // setUserToken(null),
    // setIsLoading(false)
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userEmail');
    } catch (err) {
      console.log(err);
    }
    dispatch({ type: 'LOGOUT' });
  };

  const signUp = () => {
    // setUserToken('jadhajd'),
    // setIsLoading(false)
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
