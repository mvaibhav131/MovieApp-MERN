import {Navbar, Nav, Container} from 'react-bootstrap';
import SearchPanel from '../search-panel/search-panel';
import {Link} from 'react-router-dom';
import './navigation.css';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand>Filmzzz</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Link  className="light" to="/">
                    Popular
                </Link>
                <Link  className="light" to="/favorites">
                    Favorites
                </Link>
            </Nav>
            <SearchPanel/>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default Navigation;