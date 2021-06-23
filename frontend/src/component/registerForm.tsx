import React, {Dispatch, useState} from "react";
import {Alert, Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import UserService from "../service/user/userService";

interface RegisterFormProps {
    //회원가입 완료 시 로그인화면으로 전환
    setIsLoginForm: Dispatch<React.SetStateAction<boolean>>
}

const RegisterForm: React.FC<RegisterFormProps> = ({setIsLoginForm}) => {
    const [usernameValue, setUsernameValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('E_NORMAL')
    const requestRegister = () => {
        if (!!usernameValue || !!passwordValue) {
            UserService.joinUser(usernameValue, passwordValue).then(r => {
                if (r) {
                    alert(`${usernameValue}님 환영합니다!`)
                    setIsLoginForm(true)
                } else setAlertType('E_USERNAME_EXT')
            }).catch(e => {
                alert('회원가입 중 오류 발생. 관리자에게 문의 바람.')
            })
        } else {
            setAlertType('E_BLANK')
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
                    {alertType === 'E_NORMAL'
                        ? <Alert variant={'primary'}>새회원이시군요! 가입양식을 기입해 주십시오.</Alert>
                        : (alertType === 'E_BLANK'
                            ? <Alert variant={'danger'}>가입양식을 기입해 주십시오.</Alert>
                            : (alertType === 'E_USERNAME_EXT'
                                ? <Alert variant={'primary'}>중복된 유저명이 존재합니다. 다시 시도 바랍니다.</Alert>
                                : null))}
                </Col>
            </Row>
        </>
    )
}

export default RegisterForm
