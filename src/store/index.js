import { createStore } from "redux";
import {mainReducer} from "./reducers/index.js";

export const initialState = {
  
}

const configureStore = createStore(mainReducer,initialState, window.__REDUX_DEVTOOLS_EXTENSION__);

export default configureStore;