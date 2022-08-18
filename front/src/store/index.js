import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
//import storage from 'redux-persist/lib/storage'; //local

import setUserReducer from './user';

const persistConfig = {
    key: 'root',
    storage: storageSession
}

export const rootReducer = combineReducers({
    setUserReducer
});

export default persistReducer(persistConfig, rootReducer);