import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import Spinner from "react-bootstrap/Spinner";

function Jobs({searchValue, isSearch, setSearch, category, setCategory}) {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setLoading] = useState(true);


  function changeJob(job) {
    setSelectedJob(job);
  }


  async function fetchJobs() {
    try {
      console.log(category);
      let url;
      const baseUrl = "https://strive-jobs-api.herokuapp.com/jobs?limit=10";

      // TODO: Check later, might have missed something with implementation:
      if(isSearch && searchValue.length > 2) {
        if (category && category !== "Filter jobs by Category") {
          url = baseUrl + `&category=${category}&search=${searchValue}`;
        } else {
          url = baseUrl + `&search=${searchValue}`;
        } 
      } else if(isSearch && searchValue.length < 2 && category && category !== "Filter jobs by Category") {
        url = baseUrl + `&category=${category}`;
      } else {
        url = baseUrl;
      }


      const response = await fetch(url);

      if (response.ok) {
        const {data} = await response.json();
        setJobs(data);
        setLoading(false);
        if(isSearch) {
          setSearch(false);
        }
        if(searchValue) {
          setSelectedJob(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=> {
    if (isSearch) {
      fetchJobs();
    }
    // eslint-disable-next-line
    // I wonder if this is good idea to just ignore?
    // https://typeofnan.dev/you-probably-shouldnt-ignore-react-hooks-exhaustive-deps-warnings/
    // TODO: Read more about exhaustive-deps-warnings
  }, [isSearch])



  return (
    <>
      {!isLoading && jobs.length ? (
        <Container>
          <h2 className="ml-2">Job listings</h2>
          <Row className="mt-3 align-items-baseline">
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
      ) : (<h2 className="text-center">No jobs found. Try with another search.</h2>)}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      )}
    </>
  );
}

export default Jobs;