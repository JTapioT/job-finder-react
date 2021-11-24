import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {useState, useEffect } from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";


function mapStateToProps(state) {
  return {
    favoriteCompanies: state.favorites.companies,
  };
}

function Welcome({searchValue, setSearchValue, isSearch,setSearch, setCategory, favoriteCompanies}) {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const response = await fetch(
        "https://strive-jobs-api.herokuapp.com/jobs/categories"
      );

      if (response.ok) {
        const categories = await response.json();
        setCategories(categories);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function fetchAfterMount() {
    fetchCategories();
  }, []);


  return (
    <>
    <Jumbotron
      fluid
      style={{
        background:
          "linear-gradient(180deg, rgba(204,204,204,1) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Container>
        <div className="d-flex align-items-baseline">
          <h1>Find your next job.</h1>
          {favoriteCompanies.length > 0 && (
            <Link to="/favorites">
            <i
              className="bi bi-heart-fill ml-2"
              fill="green"
              style={{ cursor: "pointer", fontSize: "3rem", color: "green" }}
            >{favoriteCompanies.length}</i>
            </Link>
          )}
        </div>
        <h5 className="card-subtitle text-muted">Search for a job.</h5>
        <Form inline className="mt-3 align-items-baseline">
          <div className="d-flex flex-column">
            <FormControl
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Type here"
            />
            <Form.Text id="searchHelpBlock" muted>
              Search must be over 3 characters long.
              <br />
              Cannot contain special characters or numbers.
            </Form.Text>
          </div>
          <Form.Group controlId="queryCriteria" className="ml-2">
            <Form.Control
              as="select"
              onChange={(e) => {
                console.log(e.target.value);
                setCategory(
                  e.target.value !== "Jobs by category" ? e.target.value : ""
                );
              }}
            >
              <option>Filter jobs by Category</option>
              {categories.map(function mapCategories(category) {
                return <option key={category}>{category}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <Button
            className="ml-1"
            type="submit"
            variant="success"
            onClick={(e) => {
              e.preventDefault();
              setSearch(true);
            }}
          >
            Search
          </Button>
        </Form>
      </Container>
    </Jumbotron>
    </>
  );
}

export default connect(mapStateToProps, null)(Welcome);