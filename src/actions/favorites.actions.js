export const SET_FAVORITECOMPANY_JOBS = "SET_FAVORITECOMPANY_JOBS";
export const FETCH_ERR = "FETCH_ERR";
export const EMPTY_FAVORITECOMPANY_JOBS = "EMPTY_FAVORITECOMPANY_JOBS";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

export function addFavoriteCompany(company) {
  return (dispatch) => {
    dispatch({
      type: ADD_FAVORITE,
      payload: company
    })
  }
}

export function removeFavoriteCompany(company) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FAVORITE,
      payload: company
    })
  }
}

export function emptyFavoriteJobList() {
  return (dispatch) => {
    dispatch({
      type: EMPTY_FAVORITECOMPANY_JOBS,
      payload: []
    })
  }
}

export function fetchFavoriteCompanyJobs() {
  return async (dispatch, getState) => {

    // console.log("Get the state,", getState());
    // I guess, in case of multiple reducers, we need to also, eg.
    // getState().reducerName.something - in order to access.
    const {companies} = getState().favorites;
    //console.log(companies);

    companies.forEach(async (company) => {
      try {
        let response = await fetch(`https://strive-jobs-api.herokuapp.com/jobs?company=${company}`);

        if(response.ok) {
          let {data} = await response.json();
          console.log(data);

          dispatch({
            type: SET_FAVORITECOMPANY_JOBS,
            payload: data,
          });
        } else {
          dispatch({
            type: FETCH_ERR,
            payload: true,
          })
        }
      } catch (error) {
        console.log(error);
      }
    });  
  }
}