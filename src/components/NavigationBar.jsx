import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";



import {useSelector} from "react-redux";
import { useEffect } from "react";

function NavigationBar() {

  const favoriteCompanies = useSelector(state => state.favorites.companies);
  const favoriteJobs = useSelector(state => state.favorites.favoriteJobs);


  return (
    <Navbar expand="lg" sticky="top" style={{ background: "#ccc" }}>
      <Container className="d-flex justify-content-start align-items-baseline">
        <Navbar.Brand href="/">
          <div className="d-flex align-items-baseline">
            <img
              src="/job-post.png"
              height="30"
              width="30"
              alt="nav-brand-icon"
            />
            <h1 className="ml-3">Jobfinder</h1>
          </div>
        </Navbar.Brand>
        {(favoriteJobs.length > 0 || favoriteCompanies.length > 0) && (
          <>
          <div style={{ position: "relative" }}>
            <Link to="/favorites" style={{ textDecorationLine: "none" }}>
              <i
                className="bi bi-heart-fill ml-2 glow"
                style={{
                  cursor: "pointer",
                  fontSize: "2rem",
                  color: "#05d60e",
                }}
              ></i>
              <p
                style={{
                  position: "absolute",
                  left: "1.08em",
                  top: "0.5em",
                  fontSize: "1.1em",
                  color: "white",
                }}
              >
               {/*  {favoriteCompanies.length} */}
              </p>
            </Link>
          </div>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;