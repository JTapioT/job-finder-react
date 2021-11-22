import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import Spinner from "react-bootstrap/Spinner";

function Jobs() {
  const [searchValue, setSearchValue] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setLoading] = useState(true);
  //const [search, setSearch] = useState(false);

  function changeJob(job) {
    setSelectedJob(job);
  }

  async function fetchJobs() {
    try {
      const defaultUrl = "https://strive-jobs-api.herokuapp.com/jobs?limit=10&skip=10";
      let searchUrl = `https://strive-jobs-api.herokuapp.com/jobs?search=${searchValue}&limit=10`;
      
      let response = await fetch(searchValue.length > 5 ? searchUrl : defaultUrl);
      if (response.ok) {
        const jobs = await response.json();
        setJobs(jobs.data);
        setLoading(false);
        if (searchValue) {
          setSelectedJob(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);





  return (
    <>
      {!isLoading && (
        <Container>
          <Form inline>
            <FormControl
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Search for a job"
              className=" mr-sm-2"
            />
            <Button
              type="submit"
              variant="success"
              onClick={(e) => {
                e.preventDefault();
                fetchJobs();
              }}
            >
              Search
            </Button>
          </Form>
          <Row className="mt-5">
            <Col md={3}>
              <JobList
                selectedJob={selectedJob}
                changeJob={changeJob}
                jobs={jobs}
              />
              <div className="mt-5 mb-5"></div>
            </Col>
            <Col md={9}>
              <JobDetails selectedJob={selectedJob} />
            </Col>
          </Row>
        </Container>
      )}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      )}
    </>
  );
}

export default Jobs;