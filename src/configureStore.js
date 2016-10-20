import { createStore } from 'redux';
import reduxApp from './reducers'

const configureStore = () => {
    const store = createStore(reduxApp, window.devToolsExtension && window.devToolsExtension());
    return store;
};

export default configureStore
