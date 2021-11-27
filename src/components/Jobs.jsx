import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import Spinner from "react-bootstrap/Spinner";
import {fetchJobs, setJob} from "../actions/jobs.actions.js";
import {connect} from "react-redux";

function mapStateToProps(state) {
  return {
    jobs: state.jobs.results,
    fetchError: state.jobs.fetchError,
    isLoading: state.jobs.loading,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    fetchJobs: () => {
      dispatch(fetchJobs());
    }
  }
};

function Jobs({fetchJobs, jobs, fetchError, isLoading}) {

  useEffect(() => {
    fetchJobs();
  }, [])


  return (
    <>
      {!isLoading && jobs.length > 0 ? (
        <Container>
          <h2 className="ml-2">Job listings</h2>
          <Row className="mt-3 align-items-baseline">
            <Col md={3}>
              <JobList />
              <div className="mt-5 mb-5"></div>
            </Col>
            <Col md={9}>
              <JobDetails />
            </Col>
          </Row>
        </Container>
      ) : (
        <h2 className="text-center">No jobs found. Try with another search.</h2>
      )}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      )}
      {fetchError && (
        <h2 className="text-center">Error. Please, contact support.</h2>
      )}
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);