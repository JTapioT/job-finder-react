export const CATEGORIES_FETCH_ERR = "CATEGORIES_FETCH_ERR";
export const SET_CATEGORIES = "SET_CATEGORIES";

export function fetchCategories() {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://strive-jobs-api.herokuapp.com/jobs/categories"
      );

      if (response.ok) {
        const categories = await response.json();
        dispatch({
          type: SET_CATEGORIES,
          payload: categories,
        });
      } else {
        dispatch({
          type: CATEGORIES_FETCH_ERR,
          payload: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}