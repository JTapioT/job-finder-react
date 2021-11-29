import { initialState } from "../index.js";
import { SET_QUERY_RESULTS, TOGGLE_LOADER, FETCH_ERR, SELECTED_JOB, SET_COMPANY_JOBS, EMPTY_SELECTED_JOB } from "../../actions/jobs.actions.js";

function jobReducer(state = initialState.jobs, action) {
  const { type, payload } = action;

  switch(type) {
    case SET_QUERY_RESULTS:
      return {
        ...state,
        results: payload
      }
    case SELECTED_JOB:
      return {
        ...state,
        selectedJob: payload
      }
    case EMPTY_SELECTED_JOB:
      return {
        ...state,
        selectedJob: payload
      }
    case SET_COMPANY_JOBS:
      return {
        ...state,
        companyJobs: payload,
      }
    case TOGGLE_LOADER:
      return {
        ...state,
        loading: payload,
      }
    case FETCH_ERR: 
      return {
        ...state,
        fetchError: payload,
      }
    default:
      return state;
  }
}

export default jobReducer;