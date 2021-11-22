import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";

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
          <Link to={`/${job.company_name}`} style={{color: "green"}}>
          <Card.Text className="font-weight-bold">{job.company_name}</Card.Text>
          </Link>
          <Card.Text className="font-weight-bold">{job.type}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Job;