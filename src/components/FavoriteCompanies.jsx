import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {removeFavoriteCompany, emptyFavoriteJobList, fetchFavoriteCompanyJobs} from "../actions/favorites.actions.js";
import {useSelector, useDispatch} from "react-redux";


function FavoriteCompanies() {

  const favoriteCompanies = useSelector(state => state.favorites.companies);
  const availableJobs = useSelector(state => state.favorites.availableJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emptyFavoriteJobList());
    dispatch(fetchFavoriteCompanyJobs());
  },[favoriteCompanies])

  return (
    <>
    <Container className="mb-5 mt-5">
      {favoriteCompanies.length > 0 && <h3>Your favorite companies:</h3>}
      <Row>
        {favoriteCompanies.length > 0 && favoriteCompanies.map((company) => (
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
                  onClick={() => dispatch(removeFavoriteCompany(company))}
                ></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {favoriteCompanies.length < 1 && (
          <h6 className="text-center">You have no favorite companies in the list. Please add companies to your favorites to see the available job posts by the companies you like.</h6>
        )}
      </Row>
      {
      availableJobs.length > 0 && <h3 className="my-5">Available jobs from your favorite companies:</h3>
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
                          style={{ color: "green", textDecorationLine: "none" }}
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
    <hr/>
    </>
  );
}

export default FavoriteCompanies;
