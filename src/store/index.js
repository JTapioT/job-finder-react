import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { loadState, saveState } from "../localStorage.js";
import thunk from "redux-thunk";
import favoriteReducer from "./reducers/favorites.reducer.js";
import jobsReducer from "./reducers/jobs.reducer.js";
import categoryReducer from "./reducers/categories.reducer.js";

const persistedState = loadState();


export const initialState = {
  jobs: {
    query: false,
    results: [],
    selectedJob: {},
    loading: true,
    fetchError: false,
  },
  categories: {
    results: [],
    fetchError: false,
  },
  favorites: {
    companies: [],
    availableJobs: [],
    fetchError: false,
  },
}

const bigReducer = combineReducers({
  jobs: jobsReducer,
  favorites: favoriteReducer,
  categories: categoryReducer,
})


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