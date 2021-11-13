import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import initState from '../constants/State';
import Reducer from '../reducers/Reducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, Reducer);
const store = createStore(persistedReducer, initState);
const persistor = persistStore(store);

export {store, persistor};
