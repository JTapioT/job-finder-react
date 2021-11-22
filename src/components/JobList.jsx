import Job from "./Job";


function JobList({jobs, selectedJob, changeJob}) {
  return(
  <div>
    { jobs.length &&
      jobs.map(function listJobs(job) {
        return <Job job={job} selectedJob={selectedJob} changeJob={changeJob}/>;
      })
    }
  </div>
  )
}

export default JobList;