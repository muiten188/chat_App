import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist'
import reducers from './reducers/index';
// import logger from 'redux-logger'

const initialState = {};

const middleware = [thunk]
export var store = null;
// if (__DEV__) {
//     middleware.push(logger);
// }

export default function storeConfig(callback) {
    store = createStore(reducers,
        initialState,
        compose(
            applyMiddleware(...middleware)
        )
    )
    // const store = createStore(reducers,
    //     initialState,
    //     compose(
    //         autoRehydrate(),
    //         applyMiddleware(...middleware),
    //         window.devToolsExtension ? window.devToolsExtension() : x => x
    //     )
    // )
    callback(store)
    // persistStore(store, { storage: AsyncStorage }, () => callback(store))
    // let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    // let store1 = createStoreWithMiddleware(reducers, initialState);
    //return store;
}