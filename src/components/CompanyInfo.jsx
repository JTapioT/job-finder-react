import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import {addFavoriteCompany, removeFavoriteCompany} from "../actions/favorites.actions";
import {fetchJobs} from "../actions/jobs.actions";
import { useSelector, useDispatch } from "react-redux";



function CompanyInfo() {
  const {company} = useParams();
  const favoriteCompanies = useSelector(state => state.favorites.companies);
  const companyJobs = useSelector(state => state.jobs.results);
  const isLoading = useSelector(state => state.jobs.loading);
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchJobs(company);
  }, [])

  useEffect(() => {}, [favoriteCompanies])

  return (
    <>
      {!isLoading && companyJobs.length ? (
        <Container className="mt-5">
          <div className="d-flex">
            <h3 className="ml-2">
              Job listings by{" "}
              <h2
                className="d-inline"
                style={{ color: "green", letterSpacing: "1px" }}
              >
                {company}
              </h2>
            </h3>
            {favoriteCompanies.includes(company) ? (
              <i
                className="bi bi-heart-fill"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(removeFavoriteCompany(company));
                }}
              ></i>
            ) : (
              <i
                className="bi bi-heart"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(addFavoriteCompany(company));
                }}
              ></i>
            )}
          </div>
          <Row className="mt-3 align-items-baseline">
            <Col md={3}>
              <JobList />
            </Col>
            <Col md={9}>
              <JobDetails />
            </Col>
          </Row>
        </Container>
      ) : (
        <h2 className="text">No jobs available from Company.</h2>
      )}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      )}
    </>
  );
}

export default CompanyInfo;