export const GET_FAVORITECOMPANY_JOBS = "GET_FAVORITECOMPANY_JOBS";
export const GET_FAVORITECOMPANY_JOBS_ERR = "GET_FAVORITECOMPANY_JOBS_ERR";

// TODO: LATER THIS EVENING REFACTOR THIS CLUSTER_F*CK ALONG WITH OTHER FILES/COMPONENT TO CONNECT WITH REDUX.

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
              type: GET_FAVORITECOMPANY_JOBS,
              payload: data,
            });
          } else {
            dispatch({
              type: GET_FAVORITECOMPANY_JOBS_ERR,
              payload: true,
            })
          }
        } catch (error) {
          console.log(error);
        }
      });  
  }
}