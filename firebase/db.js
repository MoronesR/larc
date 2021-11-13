import { GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import { firebase } from '@react-native-firebase/firestore';

GoogleSignin.configure({
    webClientId:
      '123956583858-3r1c7f1s2nh1l8fqi6eivjs9amofov33.apps.googleusercontent.com',
      profileImageSize: 120,
      offlineAccess: true,
  });

  const db = firebase.firestore();

  export default{
      GoogleSignin,
      statusCodes,
      firebase,
      db
  }