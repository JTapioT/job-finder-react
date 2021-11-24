import { initialState } from "../index.js";


function mainReducer(state = initialState, action) {
  const {type, payload} = action; //Sensei Ubeyt example from Debrief 23/11.

  switch (type) {
    case "ADD_FAVORITE_COMPANY":
      return {
        ...state,
        favorites: {
          ...state.favorites,
          companies: [...state.favorites.companies, payload]
        }
      }
    case "REMOVE_FAVORITE_COMPANY":
      return {
        ...state, 
        favorites: {
          companies: state.favorites.companies.filter((company) => company !== payload ),
        },
      }
    default:
      return state;
  }
}

// Favorites, eg. ["company1", "company2", "company3"]
// NOTE: REMEMBER NOT TO MUTATE THE ORIGINAL VALUE
// Instead of push we need to use method, which does not mutate the array:
// .concat() or spread
// Remove means to filter out the company name from the company.favorites,
// ["company1", "company2"] etc.
// Filter does not mutate the original, returns a new array

export default mainReducer;