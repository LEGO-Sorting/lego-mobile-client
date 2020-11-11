import { createStore} from "redux";
import settingsReducer from "./Settings/Settings_reducer";


const store = createStore(
  settingsReducer
);

export { store };