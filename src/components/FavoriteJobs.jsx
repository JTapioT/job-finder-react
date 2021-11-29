import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import {useEffect} from "react";
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeJobFromFavorites } from "../actions/favorites.actions";


function FavoriteJobs() {
  const favoriteJobs = useSelector(state => state.favorites.favoriteJobs);
  const dispatch = useDispatch();
  useEffect(() => {}, [favoriteJobs])

  return (
    <>
      <Container className="mb-5 mt-5">
        <Row>
          {favoriteJobs.length > 0 ? (
            <Col md={12}>
            <h3 className="my-5">Your saved job posts:</h3>
            </Col>
          ) : (
            <Col md={12}>
            <h6 className="my-5">
              You don't have any saved job posts. Like a job post to see them in
              your favorite job posts.
            </h6>
            </Col>
          )}
          {favoriteJobs.length > 0 &&
            favoriteJobs.map((job) => {
              console.log(job);
              return (
                <Col md={4}>
                  <Card
                    className="mt-3 jobDescription"
                    style={{ height: "300px" }}
                  >
                    <Card.Body>
                      <div className="d-flex flex-column">
                        <div className="d-flex">
                          <Link
                            to={`/${job.company_name}`}
                            style={{
                              color: "green",
                              textDecorationLine: "none",
                            }}
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
                            style={{
                              color: "green",
                              textDecorationLine: "none",
                            }}
                            rel="noreferrer noopener"
                          >
                            Link
                          </a>
                          <i
                            className="bi bi-eraser-fill ml-3"
                            style={{ cursor: "pointer", fontSize: "1.5rem" }}
                            onClick={() =>
                              dispatch(removeJobFromFavorites(job._id))
                            }
                          ></i>
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default FavoriteJobs;
