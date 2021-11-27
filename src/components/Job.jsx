import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import {setJob} from "../actions/jobs.actions";
import {connect} from "react-redux"

function mapStateToProps(state) {
  return {
    selectedJob: state.jobs.selectedJob,
  }
}

function dispatchStateToProps(dispatch) {
  return ({
    changeJob: (job) => {
      dispatch(setJob(job));
    }
  })
}

function Job({job, changeJob, selectedJob}) {
  return (
    <Card
      className={"mt-3"}
      onClick={() => changeJob(job)}
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

export default connect(mapStateToProps, dispatchStateToProps)(Job);