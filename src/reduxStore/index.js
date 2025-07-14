// import {createStore} from 'redux';
// import counterReducer from './reducers/counter';

import {configureStore} from '@reduxjs/toolkit';
import counterSlice from './slice/counterSlice';

// let store = createStore (counterReducer);
const store = configureStore ({
  reducer: counterSlice.reducer,
});
export default store;
