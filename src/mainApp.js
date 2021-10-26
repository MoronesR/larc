import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

import Login from '../screens/Authentication'
import Aut from '../screens/Authenticated'
import SplashScreen from './sections/screens/LoadingScreen';
// import StackApp from './StackApp';

const main = () =>{
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '123956583858-3r1c7f1s2nh1l8fqi6eivjs9amofov33.apps.googleusercontent.com',
    });

    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  },[]);

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  if (isLoading) {
    return <SplashScreen />;
  }else{
    if (!authenticated) {
      return <Login onGoogleButtonPress={onGoogleButtonPress}/>;
    }
    return <Aut/>;

  }
}

export default main;


