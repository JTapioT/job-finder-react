import { createStore } from "redux";
import mainReducer from "./reducers"
import { loadState, saveState } from "../localStorage.js";

const persistedState = loadState();


export const initialState = {
  favorites: {
    companies: [],
  },
}

const configureStore = createStore(mainReducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

configureStore.subscribe(() => {
  saveState(configureStore.getState());
})

export default configureStore;


// Dan Abramov tutorial I found as I wondered how to maintain state between 
// refresh of page: 
// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
// Save to localStorage.