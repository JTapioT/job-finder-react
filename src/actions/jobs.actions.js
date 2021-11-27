export const SET_QUERY = "SET_QUERY";
export const SET_QUERY_RESULTS = "SET_QUERY_RESULTS";
export const FETCH_ERR = "FETCH_ERR";
export const TOGGLE_LOADER = "TOGGLE_LOADER";
export const SELECTED_JOB = "SELECTED_JOB";
export const SET_COMPANY_JOBS = "SET_COMPANY_JOBS";



export function fetchJobs(query) {
  return async (dispatch) => {
    try {
      const baseUrl = "https://strive-jobs-api.herokuapp.com/jobs?limit=10";
      let url;
      if(query) {
        console.log(query);
        const category = query.category ? `&category=${query.category}` : "";
        const search = query.searchValue ? `&search=${query.searchValue}` : "";
        const company = query.company ? `&company=${query.company}` : "";
        url = baseUrl + category + search + company;
        console.log(url);
      } else {
        url = baseUrl;
      }

      const response = await fetch(url);
      if (response.ok) {
        const { data } = await response.json();

        dispatch({
          type: SET_QUERY_RESULTS,
          payload: data,
        });

        dispatch({
          type: TOGGLE_LOADER,
          payload: false,
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
  }
}

export function setJob(job) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SELECTED_JOB,
        payload: job,
      })
    } catch (error) {
      console.log(error);
    }
  }
}
