import * as types from './Settings_constants';

const setApiUri = (uri: string) => {
    return {
      type: types.setApiUri,
      payload: uri
    }
  }
  
  export {setApiUri};