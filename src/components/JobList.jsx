import Job from "./Job";
import {connect} from "react-redux";

function mapStateToProps(state) {
  return {
    jobs: state.jobs.results,
  };
}

function JobList({jobs}) {
  return(
  <div>
    { jobs.length ? (
      jobs.map(function listJobs(job) {
        return <Job key={job._id} job={job}/>;
      })
    ) : (<h2 className="text-center">No results found. Try with another search.</h2>)}
  </div>
  )
}

export default connect(mapStateToProps, null)(JobList);