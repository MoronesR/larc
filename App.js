import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
//main
import MainApp from './src/mainApp';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainApp/>
      </PersistGate>
    </Provider>
  );
};

export default App;
