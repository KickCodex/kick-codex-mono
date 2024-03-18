'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';
import { NavbarText, Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import NavSearch from '@webApp/components/layout/NavSearch';

export default function Navigation() {
    const { data: session, status } = useSession();

    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/" as={Link}>
                    KickCodex
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link as={Link} href="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} href="/explore">
                            Explore
                        </Nav.Link>
                        <Nav.Link as={Link} href="/brands">
                            Brands
                        </Nav.Link>
                        <NavSearch />
                    </Nav>
                    <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        {status === 'loading' && <Spinner variant="primary" />}
                        {status === 'authenticated' && (
                            <>
                                <NavbarText>Signed in as: {session?.user?.name}</NavbarText>
                                <Nav.Link as={Link} href="/api/auth/signout">
                                    Log Out
                                </Nav.Link>
                            </>
                        )}

                        {status === 'unauthenticated' && (
                            <Nav.Link as={Link} href="/api/auth/signin">
                                Log In / Register
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
