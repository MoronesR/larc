import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store/index';
//main
import MainApp from './src/MainApp';

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
