import { initialState } from "../index.js";
import { CATEGORIES_FETCH_ERR, SET_CATEGORIES } from "../../actions/categories.actions.js";


export default function categoryReducer(state = initialState.categories, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CATEGORIES:
      return {
        ...state,
        results: payload
      }
    case CATEGORIES_FETCH_ERR:
      return {
        ...state,
        fetchError: false,
      }
    default:
      return state;
  }
}