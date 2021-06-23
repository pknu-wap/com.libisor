import React, {Dispatch, SetStateAction} from "react";
import {Button, Form, Nav, Navbar, NavbarBrand, NavItem} from 'react-bootstrap';
import Logo from '../assets/image/pknu.png'

interface NavBarProps {
    username: string | null
    setBeforeLoginFormVisible: Dispatch<SetStateAction<boolean>>
    setProfileFormVisible: Dispatch<SetStateAction<boolean>>
    setIsLoginForm: Dispatch<SetStateAction<boolean>>
    profileFormVisible: boolean
    setLibName: Dispatch<SetStateAction<string>>
}

const NavBar: React.FC<NavBarProps> = ({
                                           username,
                                           setBeforeLoginFormVisible,
                                           setProfileFormVisible,
                                           setIsLoginForm,
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
                        {/*<NavItem>*/}
                        {/*    <div onClick={() => setLibName('mireaF1Dummy')}>*/}
                        {/*        <Nav.Link>미래로일반열람실</Nav.Link>*/}
                        {/*    </div>*/}
                        {/*</NavItem>*/}
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
                            : <>
                                <NavItem>
                                    <div onClick={() => {
                                        setBeforeLoginFormVisible(true)
                                        setIsLoginForm(false)
                                    }}>
                                        <Nav.Link>회원가입</Nav.Link>
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div onClick={() => {
                                        setBeforeLoginFormVisible(true)
                                        setIsLoginForm(true)
                                    }}>
                                        <Nav.Link>로그인</Nav.Link>
                                    </div>
                                </NavItem>
                            </>
                    }
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar
