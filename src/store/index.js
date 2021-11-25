import { createStore, combineReducers, applyMiddleware, compose } from "redux";
//import mainReducer from "./reducers"
import { loadState, saveState } from "../localStorage.js";
import thunk from "redux-thunk";
import favoriteReducer from "./reducers/favorites.js";

const persistedState = loadState();


export const initialState = {
  favorites: {
    companies: [],
    availableJobs: [],
    fetchError: false,
  },
}

const bigReducer = combineReducers({
  favorites: favoriteReducer,
})

// What is the usual way to name this? Find out later.
const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = createStore(bigReducer, persistedState, composer(applyMiddleware(thunk)));

configureStore.subscribe(() => {
  saveState(configureStore.getState());
});

export default configureStore;


// Dan Abramov tutorial I found as I wondered how to maintain state between 
// refresh of page: 
// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
// Save to localStorage.