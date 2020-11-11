import * as types from './Settings_constants';

const initialState = {
    apiUri : ''
  };
  
  const counter_reducer = (state = initialState, action: any) => {
    switch(action.type){
      case types.setApiUri: {
        return {
          ...state,
          apiUri: action.payload
        };
      }
      default: {
        return state;
      }
    }
  }
  
  export default counter_reducer;