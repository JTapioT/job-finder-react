
function JobDetails({selectedJob}) {
  return (
    <>
      {selectedJob ? (
        <div>
          <div
            className="d-flex flex-column"
            style={{
              border: "1px solid #ccc",
              borderRadius: "1em",
              padding: "1em",
            }}
          >
            <h3>{selectedJob.company_name}</h3>
            <h5 className="mt-3">
              Title:{" "}
              <h5 className="text-muted d-inline">{selectedJob.title}</h5>
            </h5>
            <h5>
              Location:{" "}
              <h5 className="text-muted d-inline">
                {selectedJob.candidate_required_location}
              </h5>
            </h5>
            <h5>
              Published:{" "}
              <h5 className="text-muted d-inline">
                {selectedJob.publication_date.slice(0, 10)}
              </h5>
            </h5>
            <h5>
              Salary:{" "}
              <h5 className="text-muted d-inline">
                {selectedJob.salary ? selectedJob.salary : "Not disclosed"}
              </h5>
            </h5>
          </div>
          <div>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "1em",
                padding: "1em",
              }}
              className="mt-5"
              dangerouslySetInnerHTML={{ __html: selectedJob.description }}
            />
          </div>
        </div>
      ) : (
        <h3 className="text-center">Please, click on a job post to see the details.</h3>
      )}
    </>
  );
}

export default JobDetails;