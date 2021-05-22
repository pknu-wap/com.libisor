import React, {Dispatch, SetStateAction, useState} from "react";
import {Alert, Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import Common from "./common";
import LoginStep2Form from "./loginStep2Form";
import UserService from "../service/user/userService";
import RegisterForm from "./registerForm";

interface LoginPageProps {
    setUsername: Dispatch<SetStateAction<null | string>>
}

const LoginForm: React.FC<LoginPageProps> = ({setUsername}) => {
    const [passwordFormVisible, setPasswordFormVisible] = useState<boolean>(false)
    const [registerFormVisible, setRegisterFormVisible] = useState<boolean>(false)
    const [wrongPwAlertVisible, setWrongPwAlertVisible] = useState<boolean>(false)
    const [usernameValue, setUsernameValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')

    const submitUser = () => {
        if (!passwordFormVisible) {
            UserService.checkUsernameExist(usernameValue).then(r => {
                if (r) {
                    setPasswordFormVisible(true)
                    setRegisterFormVisible(false)
                } else {
                    setPasswordFormVisible(false)
                    setRegisterFormVisible(true)
                    if (registerFormVisible) {
                        UserService.joinUser(usernameValue, passwordValue)
                        setUsername(usernameValue)
                    }
                }
            })
        } else {
            UserService.checkPassword(usernameValue, passwordValue).then(r => {
                if (r) {
                    setWrongPwAlertVisible(false)
                    setUsername(usernameValue)
                } else {
                    setWrongPwAlertVisible(true)
                }
            })
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
                        <div>
                            <InputGroup className={'mb-3'}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Username</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl placeholder={'아이디'} type={"text"}
                                             onChange={e => setUsernameValue(e.target.value)}/>
                            </InputGroup>
                            {passwordFormVisible ? <LoginStep2Form setPasswordValue={setPasswordValue}/> : null}
                            {registerFormVisible ? <RegisterForm setPasswordValue={setPasswordValue}/> : null}
                        </div>
                    </Col>
                </Row>
                <Common.Blank/>
                <Row>
                    <Col>
                        <Button variant="primary" onClick={submitUser}>
                            제출
                        </Button>
                    </Col>
                    <Col>
                        {passwordFormVisible && !wrongPwAlertVisible
                            ? <Alert variant={'primary'}>기존 회원이시군요! 암호를 입력해 주십시오.</Alert>
                            : null}
                        {passwordFormVisible && wrongPwAlertVisible
                            ? <Alert variant={'danger'}>틀린 암호입니다. 다시 입력해 주십시오.</Alert>
                            : null}
                        {registerFormVisible
                            ? <Alert variant={'primary'}>새회원이시군요! 가입양식을 기입해 주십시오.</Alert>
                            : null}
                    </Col>
                </Row>
                <Common.Blank/>
                <hr/>
            </Container>
        </>
    )
}

export default LoginForm
