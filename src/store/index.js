import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// Previous, implemented from Dan Abramov tutorial:
//import { loadState, saveState } from "../localStorage.js";
import thunk from "redux-thunk";
import favoriteReducer from "./reducers/favorites.reducer.js";
import jobsReducer from "./reducers/jobs.reducer.js";
import categoryReducer from "./reducers/categories.reducer.js";

// This was earlier, implemented from Dan Abramov tutorial
//const persistedState = loadState();

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

// TODO: Rename some properties more meaningfully within favorites later.

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
    favoriteJobs: [],
    fetchError: false,
  },
}

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_ENCRYPT_KEY,
    }),
  ],
};

const bigReducer = combineReducers({
  jobs: jobsReducer,
  favorites: favoriteReducer,
  categories: categoryReducer,
})

const persistedBigReducer = persistReducer(persistConfig, bigReducer);


const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = createStore(persistedBigReducer, initialState, composer(applyMiddleware(thunk)));

export const persistor = persistStore(configureStore);

// From Dan Abramov tutorial:
/* configureStore.subscribe(() => {
  saveState(configureStore.getState());
}); */

export default configureStore;


// Dan Abramov tutorial I found as I wondered how to maintain state between 
// refresh of page: 
// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
// Save to localStorage. Does not include encryption.