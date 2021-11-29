import Job from "./Job";
import {useSelector} from "react-redux";


function JobList() {
  const jobs = useSelector(state => state.jobs.results);

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

export default JobList;
