import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import Spinner from "react-bootstrap/Spinner";

function Jobs({searchValue, isSearch, setSearch, category, setCategory}) {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setLoading] = useState(true);

  //const {company} = useParams();
  //console.log(params);

  function changeJob(job) {
    setSelectedJob(job);
  }


  async function fetchJobs() {
    try {
      let url;
      const baseUrl = "https://strive-jobs-api.herokuapp.com/jobs?limit=10";

      if(isSearch && searchValue.length > 2) {
        if(category) {
          url = baseUrl + `&category=${category}&search=${searchValue}`;
        } else {
          url = baseUrl + `&search=${searchValue}`;
        } 
      } else if(isSearch && searchValue.length < 2 && category) {
        url = baseUrl + `&category=${category}`;
      } if(!isSearch) {
        url = baseUrl;
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
        if (searchValue) {
          setSelectedJob(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* useEffect(() => {
    fetchJobs();
  }, []); */

  useEffect(()=> {
    if(isSearch) {
      fetchJobs();
    }
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