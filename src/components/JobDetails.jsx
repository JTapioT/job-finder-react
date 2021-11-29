import {Link} from "react-router-dom";
import { addJobToFavorites, removeJobFromFavorites } from "../actions/favorites.actions";
import {useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";


function JobDetails() {

  const selectedJob = useSelector(state => state.jobs.selectedJob);
  const favoriteJobs = useSelector(state => state.favorites.favoriteJobs);
  const dispatch = useDispatch();

  useEffect(() => {}, [favoriteJobs, selectedJob])

  return (
    <>
      {Object.entries(selectedJob).length > 0 && (
        <div>
          <div
            className="d-flex flex-column selectedJobOverview"
            style={{
              border: "1px solid #ccc",
              borderRadius: "1em",
              padding: "1em",
            }}
          >
            <Link
              to={`/${selectedJob.company_name}`}
              style={{ textDecorationLine: "none", color: "green" }}
            >
              <h3>{selectedJob.company_name}</h3>
            </Link>
            <h5 className="mt-3">
              {/* Title:{" "} */}
              <h5 style={{ color: "green" }} className="d-inline">
                {selectedJob.title}
              </h5>
            </h5>
            <h5>
              Location:{" "}
              <h5 style={{ color: "green" }} className="d-inline">
                {selectedJob.candidate_required_location}
              </h5>
            </h5>
            <h5>
              Published:{" "}
              <h5 style={{ color: "green" }} className="d-inline">
                {selectedJob.publication_date.slice(0, 10)}
              </h5>
            </h5>
            <h5>
              Salary:{" "}
              <h5 style={{ color: "green" }} className="d-inline">
                {selectedJob.salary
                  ? selectedJob.salary
                  : "Not disclosed"}
              </h5>
            </h5>
            {favoriteJobs.length > 0 &&
            favoriteJobs.findIndex(
              (favoriteJob) => favoriteJob._id === selectedJob._id
            ) !== -1 ? (
              <i
                className="bi bi-heart-fill"
                style={{ cursor: "pointer", fontSize: "1rem" }}
                onClick={() => {
                  dispatch(removeJobFromFavorites(selectedJob._id));
                }}
              ></i>
            ) : (
              <i
                className="bi bi-heart"
                style={{ cursor: "pointer", fontSize: "1rem" }}
                onClick={() => {
                  console.log(selectedJob);
                  dispatch(addJobToFavorites(selectedJob));
                }}
              ></i>
            )}
          </div>
          <div>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "1em",
                padding: "1em",
              }}
              className="mt-5 jobDescription"
              dangerouslySetInnerHTML={{ __html: selectedJob.description }}
            />
          </div>
        </div>
      )}
      {Object.entries(selectedJob).length === 0 && (
        <h3 className="text-center">
          Please, click on a job post to see the details.
        </h3>
      )}
    </>
  );
}

export default JobDetails;
//export default connect(mapStateToProps,null)(JobDetails);