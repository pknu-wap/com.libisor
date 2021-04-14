import React, {Dispatch, SetStateAction} from "react";
import {Button, Form, Nav, Navbar} from "react-bootstrap";
import Logo from '../assets/image/pknu.png'

interface NavBarProps {
    username: string | null
    setLoginFormVisible: Dispatch<SetStateAction<boolean>>
}

const NavBar: React.FC<NavBarProps> = ({username, setLoginFormVisible}) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        alt="pukyong"
                        src={Logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    LIBISOR.COM
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">xx열람실</Nav.Link>
                        <Nav.Link href="#link">yy열람실</Nav.Link>
                    </Nav>
                    {
                        username
                            ? <Form inline>
                                <Button variant="outline-primary">{username} 님</Button>
                            </Form>
                            : <Form inline>
                                <Button variant="outline-primary" onClick={() => setLoginFormVisible(true)}>회원가입 / 로그인</Button>
                            </Form>
                    }
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar
