import { initialState } from "../index.js";
import {SET_FAVORITECOMPANY_JOBS, EMPTY_FAVORITECOMPANY_JOBS, FETCH_ERR, ADD_FAVORITE, REMOVE_FAVORITE, REMOVE_JOB_FROM_FAVORITES, ADD_JOB_TO_FAVORITES} from "../../actions/favorites.actions"



function favoriteReducer(state = initialState.favorites, action) {

  const { type, payload } = action;

  switch (type) {
    case ADD_FAVORITE:
      return {
        ...state,
        companies: [...state.companies, payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company !== payload
        ),
      };
    case SET_FAVORITECOMPANY_JOBS:
      return {
        ...state,
        availableJobs: [...state.availableJobs, ...payload]
      }
    case EMPTY_FAVORITECOMPANY_JOBS:
      return {
        ...state,
        // Maybe consider this again later.
        availableJobs: []
      }
    case ADD_JOB_TO_FAVORITES:
      return {
        ...state,
        favoriteJobs: [...state.favoriteJobs, payload],
      }
    case REMOVE_JOB_FROM_FAVORITES:
      return {
        ...state,
        favoriteJobs: state.favoriteJobs.filter(favoriteJob => favoriteJob._id !== payload)
      }
    case FETCH_ERR:
      return {
        ...state,
        fetchError: true,
      }
    default:
      return state;
  }
}

export default favoriteReducer;
