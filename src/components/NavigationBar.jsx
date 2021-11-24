import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function NavigationBar() {
  return (
    <Navbar expand="lg" sticky="top" style={{ background: "#ccc" }}>
      <Container>
        <Navbar.Brand href="/">
          <div className="d-flex align-items-baseline">
            <img src="/job-post.png" height="30" width="30" alt="nav-brand-icon" />
            <h1 className="ml-3">Jobfinder</h1>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;