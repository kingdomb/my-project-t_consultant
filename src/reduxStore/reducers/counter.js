
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      let newState={...state}
      return { value: newState.value + action.payload  }
    case 'counter/decremented':
      newState={...state}
      return { value: newState.value - 1 }
    default:
      return state
  }
}
export default counterReducer;