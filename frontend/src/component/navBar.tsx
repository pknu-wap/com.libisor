import React, {Dispatch, SetStateAction} from "react";
import {Button, Form, Nav, Navbar, NavbarBrand, NavItem} from 'react-bootstrap';
import Logo from '../assets/image/pknu.png'

interface NavBarProps {
    username: string | null
    setLoginFormVisible: Dispatch<SetStateAction<boolean>>
    setProfileFormVisible: Dispatch<SetStateAction<boolean>>
    loginFormVisible: boolean
    profileFormVisible: boolean
    setLibName: Dispatch<SetStateAction<string>>
}

const NavBar: React.FC<NavBarProps> = ({
                                           username,
                                           setLoginFormVisible,
                                           loginFormVisible,
                                           setProfileFormVisible,
                                           profileFormVisible,
                                           setLibName
                                       }) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <NavbarBrand href="#home">
                    <img
                        alt="pukyong"
                        src={Logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    LIBISOR.COM
                </NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <NavItem>
                            <div onClick={() => setLibName('mireaF1Dummy')}>
                                <Nav.Link>미래로일반열람실</Nav.Link>
                            </div>
                        </NavItem>
                        <NavItem>
                            <div onClick={() => setLibName('mireaB1Dummy')}>
                                <Nav.Link>미래로노트북열람실</Nav.Link>
                            </div>
                        </NavItem>
                    </Nav>
                    {
                        username
                            ? <Form inline>
                                <Button variant="outline-primary"
                                        onClick={() => setProfileFormVisible(!profileFormVisible)}>{username} 님</Button>
                            </Form>
                            : <Form inline>
                                <Button variant="outline-primary" onClick={() => setLoginFormVisible(!loginFormVisible)}>회원가입
                                    / 로그인</Button>
                            </Form>
                    }
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar
