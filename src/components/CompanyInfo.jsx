import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import JobList from "./JobList";
import JobDetails from "./JobDetails";

function CompanyInfo() {
  const {company} = useParams();
  const [companyJobs, setCompanyJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setLoading] = useState(true);

  function changeJob(job) {
    setSelectedJob(job);
  }

  async function fetchCompanyInformation() {
    try {
      let response = await fetch(
        `https://strive-jobs-api.herokuapp.com/jobs?company=${company}`
      );

      if(response.ok) {
        const {data} = await response.json();
          setCompanyJobs(data);
          setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCompanyInformation();
  }, [])

  return (
    <>
      {!isLoading && companyJobs.length ? (
        <Container>
          <h3 className="ml-2">Job listings by <h2 className="d-inline" style={{color:"green", letterSpacing: "1px"}}>{company}</h2></h3>
          <Row className="mt-3 align-items-baseline">
            <Col md={3}>
              <JobList
                selectedJob={selectedJob}
                changeJob={changeJob}
                jobs={companyJobs}
              />
            </Col>
            <Col md={9}>
              <JobDetails selectedJob={selectedJob}/>
            </Col>
          </Row>
        </Container>
      ) : (
        <h2 className="text">No jobs available from Company.</h2>
      )
      }
      {
        isLoading && (
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" />
          </div>
        )
      }
    </>
  );
}

export default CompanyInfo;