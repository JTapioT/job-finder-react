import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

function Welcome() {
  return (
    <Jumbotron
      fluid
      style={{
        background:
          "linear-gradient(180deg, rgba(204,204,204,1) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Container>
        <h1>Find your next job.</h1>
        <h5 className="card-subtitle text-muted">
          Search for a job.
        </h5>
      </Container>
    </Jumbotron>
  );
}

export default Welcome;