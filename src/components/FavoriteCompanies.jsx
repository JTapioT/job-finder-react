import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {removeFavoriteCompany, emptyFavoriteJobList, fetchFavoriteCompanyJobs} from "../actions/favorites.actions.js";


function mapStateToProps(state) {
  return {
    favoriteCompanies: state.favorites.companies,
    availableJobs: state.favorites.availableJobs,
    fetchError: state.favorites.fetchError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeFavorite: (company) => {
      dispatch(removeFavoriteCompany(company))
    },
    emptyAvailableJobs: () => {
      dispatch(emptyFavoriteJobList())
    },
    fetchAvailableJobs: () => {
      dispatch(fetchFavoriteCompanyJobs())
    },
  };
}

function FavoriteCompanies({favoriteCompanies, removeFavorite, fetchAvailableJobs, availableJobs, emptyAvailableJobs}) {


  useEffect(() => {
    emptyAvailableJobs();
    fetchAvailableJobs();
  },[favoriteCompanies])


  return (
    <Container className="mb-5 mt-5">
      {favoriteCompanies.length > 0 && <h3>Your favorite companies:</h3>}
      <Row>
        {favoriteCompanies.map((company) => (
          <Col md={4}>
            <Card
              className={"mt-3"}
            >
              <Card.Body
                className="selectedJobOverview"
              >
                <div className="d-flex align-items-baseline">
                <Link to={`/${company}`} style={{ color: "green", textDecorationLine: "none" }}>
                  <h4>{company}</h4>
                </Link>
                <i
                  className="bi bi-eraser-fill ml-3"
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  onClick={() => removeFavorite(company)}
                ></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {favoriteCompanies.length < 1 && (
          <h3 className="text-center">You have no favorites anymore in the list. Please add companies to your favorites.</h3>
        )}
      </Row>
      {
      availableJobs.length > 0 && <h3 className="my-5">Available jobs from the companies:</h3>
      }
      <Row>
        {
          availableJobs.length > 0 && availableJobs.map((job) => {
            console.log(job);
            return (
              <Col md={4}>
                <Card className="mt-3 jobDescription" style={{ height: "300px" }}>
                  <Card.Body>
                    <div className="d-flex flex-column">
                      <div className="d-flex">
                        <Link
                          to={`/${job.company_name}`}
                          style={{ color: "green" }}
                        >
                          <Card.Text className="font-weight-bold">
                            {job.company_name}
                          </Card.Text>
                        </Link>
                      </div>
                      <Card.Text className="font-weight-bold mt-3">
                        {job.title}
                      </Card.Text>
                      <Card.Text className="font-weight-bold">
                        Location: {job.candidate_required_location}
                      </Card.Text>
                      <Card.Text className="font-weight-bold">
                        Salary: {job.salary ? job.salary : "Undisclosed"}
                      </Card.Text>
                      <Card.Text className="font-weight-bold">
                        <a
                          href={job.url}
                          style={{ color: "green", textDecorationLine: "none" }}
                          rel="noreferrer noopener"
                        >
                          Link
                        </a>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        }
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCompanies);