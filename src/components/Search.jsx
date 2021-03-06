import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {useState, useEffect } from "react";
import { fetchJobs, emptySelectedJob } from "../actions/jobs.actions";
import { fetchCategories } from "../actions/categories.actions";
import {useSelector, useDispatch} from "react-redux";



function Search() {
  const [query, setQuery] = useState({category: "", searchValue: ""});
  const [makeQuery, setMakeQuery] = useState(false);
  const categories = useSelector(state => state.categories.results);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if(makeQuery) {
      dispatch(fetchJobs(query));
      setMakeQuery(false);
    }
  }, [makeQuery])


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
          <div className="d-flex align-items-baseline justify-content-between">
            <h1>Find your next job!</h1>
            {/* {favoriteCompanies.length > 0 && (
              <div style={{position: "relative"}}>
                <Link to="/favorites" style={{ textDecorationLine: "none" }}>
                  <i
                    className="bi bi-heart-fill ml-2 glow"
                    style={{
                      cursor: "pointer",
                      fontSize: "3rem",
                      color: "#05d60e",
                    }}
                  >
                  </i>
                    <p style={{position: "absolute", left: "1.1em", top: "0.8em", fontSize: "1.4em", color: "white"}}>{favoriteCompanies.length}</p>
                </Link>
              </div>
            )} */}
          </div>
          <h5 className="card-subtitle text-muted">Search for a job</h5>
          <Form inline className="mt-3 align-items-baseline">
            <div className="d-flex flex-column">
              <FormControl
                type="text"
                value={query.searchValue}
                onChange={(e) => {
                  setQuery({...query, searchValue: e.target.value});
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
                  setQuery({
                    ...query,
                    category:
                      e.target.value != "Filter jobs by Category"
                        ? e.target.value
                        : "",
                  });
                }}
              >
                <option>Filter jobs by Category</option>
                {categories && categories.map(function mapCategories(category) {
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
                setMakeQuery(true);
                dispatch(emptySelectedJob());
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

export default Search;