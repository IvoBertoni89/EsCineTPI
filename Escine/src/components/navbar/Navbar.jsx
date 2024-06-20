import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../sevices/authentication/autentication.context'; // Asegúrate de ajustar la ruta de importación según tu estructura
import { HashLink } from 'react-router-hash-link';

function NavbarComponent() {
    const navigateLogin = useNavigate();
    const { handleLogout, userData } = useContext(AuthenticationContext);

    return (
        <Navbar expand="lg" className="navbar_container p-3 bg-primary-user text-decoration-none sticky-top">
            <Container fluid>
                <Navbar.Brand className="mx-5 fs-2 text-white font-marca" href="#">
                    Es Cine 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto d-flex align-items-center text-white my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
                        <HashLink smooth to="/#gridcards" className="mx-2 text-decoration-none text-white fs-5">
                            Contacto
                        </HashLink>
                        {userData ? (
                            <Button variant="outline-light mx-4 lg btn-lg fw-bold" onClick={handleLogout}>
                                Cerrar sesión
                            </Button>
                        ) : (
                            <>
                                <Button className="btn-lg bg-info text-white me-md-2 fw-bold bx-2 border-0" onClick={() => navigateLogin("/login")}>
                                    Iniciar sesión
                                </Button>
                                <Button variant="outline-light lg btn-lg fw-bold" onClick={() => navigateLogin("/login")}>
                                    Registrarte
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
