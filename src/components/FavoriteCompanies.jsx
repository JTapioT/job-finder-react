import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {useEffect} from "react";
import {Link} from "react-router-dom";


function mapStateToProps(state) {
  return {
    favoriteCompanies: state.favorites.companies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeFavorite: function removeFavorite(company) {
      dispatch({
        type: "REMOVE_FAVORITE_COMPANY",
        payload: company,
      });
    },
  };
}

function FavoriteCompanies({favoriteCompanies, removeFavorite}) {

  useEffect(() => {
  },[favoriteCompanies])

  return (
    <Container className="mb-5 mt-5">
      {favoriteCompanies.length > 0 && <h3>Your favorite companies:</h3>}
      <Row>
        {favoriteCompanies.map((company) => (
          <Col md={3}>
            <Card
              className={"mt-3"}
              style={{
                background: "#ccc",
              }}
            >
              <Card.Body
                className="d-flex align-items-baseline"
              >
                <Link to={`/${company}`} style={{ color: "green", textDecorationLine: "none" }}>
                  <h4>{company}</h4>
                </Link>
                <i
                  className="bi bi-eraser-fill ml-3"
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  onClick={() => removeFavorite(company)}
                ></i>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {favoriteCompanies.length < 1 && (
          <h3 className="text-center">You have no favorites anymore in the list. Please add companies to your favorites.</h3>
        )}
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCompanies);