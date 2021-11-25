import { initialState } from "../index.js";
import {GET_FAVORITECOMPANY_JOBS, GET_FAVORITECOMPANY_JOBS_ERR} from "../../actions"

// TODO: LATER THIS EVENING REFACTOR THIS CLUSTER_F*CK ALONG WITH OTHER FILES/COMPONENTS TO CONNECT WITH REDUX.

function favoriteReducer(state = initialState.favorites, action) {
  // Destructure for the win!
  const { type, payload } = action; //Sensei Ubeyt example from Debrief 23/11.

  switch (type) {
    case "ADD_FAVORITE_COMPANY":
      return {
        ...state,
        companies: [...state.companies, payload],
      };
    case "REMOVE_FAVORITE_COMPANY":
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company !== payload
        ),
      };
    case GET_FAVORITECOMPANY_JOBS:
      return {
        ...state,
        availableJobs: [...state.availableJobs, ...payload]
      }
    case "EMPTY_FAVORITECOMPANY_JOBS":
      return {
        ...state,
        availableJobs: []
      }
    case GET_FAVORITECOMPANY_JOBS_ERR:
      return {
        ...state,
        fetchError: true,
      }
    default:
      return state;
  }
}

export default favoriteReducer;
