import { legacy_createStore as createStore } from 'redux';

// initial global state of your Redux store
const initialState = {
  isLoggedIn: false, 
  token: null,
};

// reducer function determines state changes based on actions
// pure function
// payload - 
function rootReducer(state = initialState, action: any) {
  switch (action.type) {  // check action type to decide how to update state
    case 'LOGIN':
      console.log(action.token);
      
      return { ...state, isLoggedIn: true, token: action.token };
      
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, token: null };

    default:
      return state;  // current state unchanged
  }
}

// Create the Redux store/pass rootReducer fn
const store = createStore(rootReducer);

export default store;