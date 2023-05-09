import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => (
    <Navbar expand="lg" bg="white" className='shadow-sm'>
        <Container>
        <Navbar.Brand as={Link} to="/">Slack chat</Navbar.Brand>
        <Nav className="mr-auto">
          <Button as={Link} to="/login" variant='primary'>Log in</Button>
        </Nav>
        </Container>
      </Navbar> 
)

export default Navigation;