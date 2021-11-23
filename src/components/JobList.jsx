import Job from "./Job";


function JobList({jobs, selectedJob, changeJob}) {
  return(
  <div>
    { jobs.length ? (
      jobs.map(function listJobs(job) {
        return <Job key={job._id} job={job} selectedJob={selectedJob} changeJob={changeJob}/>;
      })
    ) : (<h2 className="text-center">No results found. Try with another search.</h2>)}
  </div>
  )
}

export default JobList;