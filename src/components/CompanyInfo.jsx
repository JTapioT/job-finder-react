import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import { connect } from "react-redux";
import {addFavoriteCompany, removeFavoriteCompany} from "../actions/favorites.actions";
import {fetchJobs} from "../actions/jobs.actions";

// 

function mapStateToProps(state) {
  return {
    favoriteCompanies: state.favorites.companies,
    companyJobs: state.jobs.results,
    isLoading: state.jobs.loading,
  };
}

// Dispatch => action, which is an object, type required, payload optional.
function mapDispatchToProps(dispatch) {
  return {
    addToFavorite: (company) => {
      dispatch(addFavoriteCompany(company))
    },
    removeFavorite: (company) => {
      dispatch(removeFavoriteCompany(company));
    },
    getCompanyJobs: (company) => {
      dispatch(fetchJobs({category: "", search: "", company: company}))
    }
  };
}

function CompanyInfo({favoriteCompanies, addToFavorite, removeFavorite, getCompanyJobs, isLoading, companyJobs}) {
  const {company} = useParams();
  
  useEffect(() => {
    getCompanyJobs(company);
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
                  removeFavorite(company);
                }}
              ></i>
            ) : (
              <i
                className="bi bi-heart"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  addToFavorite(company);
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfo);