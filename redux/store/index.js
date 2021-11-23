import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Reducer from '../reducers/DevicesReducer';
import initState from '../constants/State';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, Reducer);
const store = createStore(persistedReducer,initState, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};