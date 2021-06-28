import React, {Dispatch, useState} from "react";
import {Alert, Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import UserService from "../service/user/userService";

interface RegisterFormProps {
    setIsLoginForm: Dispatch<React.SetStateAction<boolean>>
}

const RegisterForm: React.FC<RegisterFormProps> = ({setIsLoginForm}) => {
    const [usernameValue, setUsernameValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('E_NORMAL')
    const requestRegister = () => {
        if (!usernameValue || !passwordValue) {
            setAlertType('E_BLANK')
        } else {
            UserService.joinUser(usernameValue, passwordValue).then(r => {
                if (r.status) {
                    alert(`${usernameValue}님 환영합니다!`)
                    setIsLoginForm(true)
                }else {
                    switch (r.message) {
                        case 'E_EXIST':
                            setAlertType('E_EXIST');
                            break;
                        default:
                            setAlertType('E_ERROR');
                            break;
                    }
                }
            }).catch(e => {
                setAlertType('E_ERROR')
                console.log({
                    msg: '관리자에게 이 오류 메세지를 보내주세요.',
                    e
                })
            })
        }
    }
    const makeAlert = () => {
        switch (alertType) {
            case 'E_NORMAL':
                return <Alert variant={'primary'}>새회원이시군요! 가입양식을 기입해 주십시오. (Registration)</Alert>
            case 'E_BLANK':
                return <Alert variant={'success'}>가입양식을 기입해 주십시오 (Fulfill please)</Alert>
            case 'E_EXIST':
                return <Alert variant={'primary'}>중복된 유저명이 존재합니다. 다시 시도 바랍니다. (Username exist)</Alert>
            case 'E_ERROR':
                return <Alert variant={'danger'}>회원가입 중 오류 발생. 관리자에게 문의 바람. (Error, contact to admin)</Alert>
            default:
                return null
        }
    }

    return (
        <>
            <Row className={'mb-3'}>
                <Col>
                    <h4>
                        회원가입
                    </h4>
                </Col>
            </Row>
            <Row className={'mb-3'}>
                <Col>
                    <InputGroup className={'mb-3'}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Username</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder={'아이디'} type={"text"}
                                     onChange={e => setUsernameValue(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className={'mb-3'}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Password</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder={'암호'} type={"password"}
                                     onChange={e => setPasswordValue(e.target.value)}/>
                    </InputGroup>
                </Col>
            </Row>
            <Row className={'mb-3'}>
                <Col>
                    <Card>
                        <Card.Body>
                            약관의 내용
                        </Card.Body>
                        <Card.Footer>
                            <small>
                                상기 이용약관에 대한 동의는 아래 '제출' 버튼을 누름으로써 의사표시를 합니다.
                            </small>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={requestRegister}>
                        회원가입
                    </Button>
                </Col>
                <Col>
                    {makeAlert()}
                </Col>
            </Row>
        </>
    )
}

export default RegisterForm
