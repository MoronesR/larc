// import React from 'react';
// import {Provider} from 'react-redux';
// import AppStack from './src/StackApp';
// import {PersistGate} from 'redux-persist/integration/react';
// import {store, persistor} from './store';

// const App: () => React$Node = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <AppStack />
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import Authentication from './screens/Authentication';
import Authenticated from './screens/Authenticated';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '123956583858-3r1c7f1s2nh1l8fqi6eivjs9amofov33.apps.googleusercontent.com',
    });
  }, []);

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

  if (authenticated) {
    return <Authenticated />;
  }

  return <Authentication onGoogleButtonPress={onGoogleButtonPress} />;
}
