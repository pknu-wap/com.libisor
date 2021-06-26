import React, {Dispatch, SetStateAction, useState} from "react";
import {Alert, Button, Col, FormControl, InputGroup, Row} from 'react-bootstrap';
import UserService from "../service/user/userService";

interface LoginFormProps {
    setUsername: Dispatch<SetStateAction<string | null>>
    setBeforeLoginFormVisible: Dispatch<SetStateAction<boolean>>
}

const LoginForm: React.FC<LoginFormProps> = ({setUsername, setBeforeLoginFormVisible}) => {
    const [usernameValue, setUsernameValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const requestLogin = () => {
        if (!usernameValue || !passwordValue) {
            setAlertType('E_BLANK')
        } else {
            UserService.loginUser(usernameValue, passwordValue).then(r => {
                if (r.status) {
                    UserService.getUsername().then(r => {
                        setUsername(r)
                    })
                    setBeforeLoginFormVisible(false)
                }else {
                    switch (r.message) {
                        case 'E_WRONG':
                            setAlertType('E_WRONG');
                            break;
                        default:
                            setAlertType('E_ERROR');
                            break;
                    }
                }
            }).catch(e => {
                setAlertType('E_ERROR')
            })
        }
    }
    const makeAlert = () => {
        switch (alertType) {
            case 'E_BLANK':
                return <Alert variant={'success'}>아이디와 암호를 입력하십시오. (Fulfill please)</Alert>
            case 'E_WRONG':
                return <Alert variant={'danger'}>회원정보를 찾을 수 없습니다. 다시 입력해 주십시오. (No User)</Alert>
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
                        로그인
                    </h4>
                </Col>
            </Row>
            <Row className={'mb-3'}>
                <Col>
                    <div>
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
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={requestLogin}>
                        로그인
                    </Button>
                </Col>
                <Col>
                    {makeAlert()}
                </Col>
            </Row>
        </>
    )
}

export default LoginForm
