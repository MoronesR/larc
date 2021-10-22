import {createStore} from 'redux';
import Reducer from './Reducer.js';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import state from './State';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, Reducer);
const store = createStore(persistedReducer, state);
const persistor = persistStore(store);

export {store, persistor};
