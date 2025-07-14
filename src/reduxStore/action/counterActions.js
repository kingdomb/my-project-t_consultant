import { INCREMENT_COUNTER } from "../types";

export const add=(dispatch)=>{
    dispatch({type: INCREMENT_COUNTER, payload: 1});
}
export const decrement=(dispatch)=>{
    dispatch({type: 'counter/decremented'});
}
