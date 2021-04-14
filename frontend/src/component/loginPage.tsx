import React, {Dispatch, SetStateAction, useState} from "react";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import Common from "./common";
import LoginStep2Page from "./loginStep2Page";
import UserService from "../service/user/userService";

interface LoginPageProps {
    setUsername: Dispatch<SetStateAction<null | string>>
}

const LoginPage: React.FC<LoginPageProps> = ({setUsername}) => {
    const [passwordFormVisible, setPasswordFormVisible] = useState<boolean>(false)
    const [registerFormVisible, setRegisterFormVisible] = useState<boolean>(false)
    const [wrongPwAlertVisible, setWrongPwAlertVisible] = useState<boolean>(false)
    const [usernameValue, setUsernameValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')

    const submitUser = () => {
        if (!passwordFormVisible) {
            if (UserService.checkUsernameExist(usernameValue)) {
                setPasswordFormVisible(true)
                setRegisterFormVisible(false)
            } else {
                setPasswordFormVisible(false)
                setRegisterFormVisible(true)
            }
        } else {
            if (UserService.checkPassword(usernameValue, passwordValue)) {
                setWrongPwAlertVisible(false)
                setUsername(usernameValue)
            } else {
                setWrongPwAlertVisible(true)
            }
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h4>
                            회원가입 / 로그인
                        </h4>
                    </Col>
                </Row>
                <Common.Blank/>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="id">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="아이디"
                                              onChange={e => setUsernameValue(e.target.value)}/>
                            </Form.Group>
                            {passwordFormVisible ? <LoginStep2Page setPasswordValue={setPasswordValue}/> : null}
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" onClick={submitUser}>
                            제출
                        </Button>
                    </Col>
                    <Col>
                        {passwordFormVisible && !wrongPwAlertVisible
                            ? <Alert variant={'primary'}>암호를 입력해 주십시오.</Alert>
                            : null}
                        {passwordFormVisible && wrongPwAlertVisible
                            ? <Alert variant={'danger'}>틀린 암호입니다. 다시 입력해 주십시오.</Alert>
                            : null}
                    </Col>
                </Row>
                <Common.Blank/>
                <hr/>
            </Container>
        </>
    )
}

export default LoginPage
