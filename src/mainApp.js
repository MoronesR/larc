import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '../firebase/db'
import Login from './sections/screens/Authentication'
import SplashScreen from './sections/screens/LoadingScreen';
import Drawer from './Drawer'
import {connect} from 'react-redux';
import {addNewUser} from '../Actions';
import Toast from 'react-native-simple-toast';

const main = (props) =>{
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  },[]);

  //login google or anonymous
  const onGoogleButtonPress = async() => {
    try {
      const { idToken } = await firebase.GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredential)
      .then((result) => {
        saveNewUser();
      }) 
    } catch (error) {
      if (error.code === firebase.statusCodes.SIGN_IN_CANCELLED) {
        console.info('user cancelled the login flow')
      } else if (error.code === firebase.statusCodes.IN_PROGRESS) {
        console.info('operation is in progress already')
      } else if (error.code === firebase.statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.info('play services not available or outdated')
      } else if(error.code === '7' ){
        Toast.show("Intente conectarce a una red");
      }else{
        console.warn('some other error happened', error.code)
      }
    }
  }
  const onAnonymousPress = async() => {
    auth()
    .signInAnonymously()
    .then(() => {
      console.log('User signed in anonymously');
    })
    .catch(error => {
      console.error(error);
    });
  }

  const saveNewUser = async() =>{
    const dataUser = auth().currentUser;
    await firebase.db.collection('User')
    .doc(dataUser.email)
    .set({
      name: dataUser.displayName,
      email: dataUser.email
    })
  }

  auth().onAuthStateChanged((user) => {
    if (user) {
      props.addNewUser({
        id: auth().currentUser.uid,
        email: auth().currentUser.email,
        name: auth().currentUser.displayName,
        session: true,
        anonymous: auth().currentUser.isAnonymous
      })
    } else {
      props.addNewUser({
        id: null,
        session: false,
        anonymous: false
      })
    }
  });

  if (isLoading) {
    return <SplashScreen />;
  }else{
    if (!props.authenticated) {
      return <Login onGoogleButtonPress={onGoogleButtonPress} onAnonymousPress={onAnonymousPress}/>;
    }
    return <Drawer/>;
  }
}

const mapStateToProps = (state) => {
  return {authenticated: state.login.session}
}

const mapDispatchToProps = {
  addNewUser,
}

export default connect(mapStateToProps,mapDispatchToProps)(main);


