import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    favoriteCompanies: state.favorites.companies,
  };
}

// Dispatch => action, which is an object, type required, payload optional.
function mapDispatchToProps(dispatch) {
  return {
    addToFavorite: function addToFavorite(company) {
      dispatch({
        type: "ADD_FAVORITE_COMPANY",
        payload: company,
      });
    },
    removeFavorite: function removeFavorite(company) {
      dispatch({
        type: "REMOVE_FAVORITE_COMPANY",
        payload: company,
      });
    },
  };
}

function CompanyInfo({favoriteCompanies, addToFavorite, removeFavorite}) {
  const {company} = useParams();
  const [companyJobs, setCompanyJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isLiked, setLike] = useState(false);

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

  useEffect(() => {}, [favoriteCompanies])

  return (
    <>
      {!isLoading && companyJobs.length ? (
        <Container>
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
            {favoriteCompanies.length > 0 &&
              favoriteCompanies.includes((listCompany) => listCompany === company) && (
                <i
                  className="bi bi-heart-fill"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setLike(false);
                    removeFavorite(company);
                  }}
                ></i>
              )}
            {isLiked && (
              <i
                className="bi bi-heart-fill"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setLike(false);
                  removeFavorite(company);
                }}
              ></i>
            )}
            {!isLiked && (
              <i
                className="bi bi-heart"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setLike(true);
                  addToFavorite(company);
                }}
              ></i>
            )}
          </div>
          <Row className="mt-3 align-items-baseline">
            <Col md={3}>
              <JobList
                selectedJob={selectedJob}
                changeJob={changeJob}
                jobs={companyJobs}
              />
            </Col>
            <Col md={9}>
              <JobDetails selectedJob={selectedJob} />
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