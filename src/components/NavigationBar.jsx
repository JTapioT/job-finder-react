import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

function NavigationBar({searchValue, setSearchValue}) {
  return (
    <Navbar expand="lg" sticky="top" style={{ background: "#ccc" }}>
      <Container>
        <Navbar.Brand href="/">
          <div className="d-flex align-items-baseline">
            <img src="/job-post.png" height="30" width="30" />
            <h1 className="ml-3">Jobfinder</h1>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;