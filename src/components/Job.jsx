import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import {setJob} from "../actions/jobs.actions";
import {useSelector, useDispatch} from "react-redux";


function Job({job, changeJob, selectedJob}) {
  const selectedJobs = useSelector(state => state.jobs.selectedJob);
  const dispatch = useDispatch();

  return (
    <Card
      className={"mt-3"}
      onClick={() => dispatch(setJob(job))}
      style={{
        cursor: "pointer",
        background: selectedJob?._id === job._id ? "#ccc" : "white",
      }}
    >
      <Card.Body className="d-flex">
        <div>
          <Card.Text className="font-weight-bold">{job.title}</Card.Text>
          <div className="d-flex">
            <Link to={`/${job.company_name}`} style={{ color: "green" }}>
              <Card.Text className="font-weight-bold">
                {job.company_name}
              </Card.Text>
            </Link>
          </div>
          <Card.Text className="font-weight-bold">{job.type}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Job;