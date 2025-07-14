import {createContext, useReducer} from 'react';
import countReducer from '../reducers/CountReducer';
import {INCREMENT, DECREMENT} from '../actionsTypes';

const FirstContext = createContext ();

const FirstContextProvider = ({children}) => {
  const [state, dispatch] = useReducer (countReducer, 0);

  //actions
  const increment = () => {
    dispatch ({type: INCREMENT});
  };
  const decrement = () => {
    dispatch ({type: DECREMENT});
  };

  return (
    <FirstContext.Provider value={{state, increment, decrement}}>
      {children}
    </FirstContext.Provider>
  );
};

export default FirstContext;
export {FirstContextProvider};
