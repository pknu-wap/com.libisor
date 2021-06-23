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
    const [wrongPwAlertVisible, setWrongPwAlertVisible] = useState<boolean>(false)
    const requestLogin = () => {
        UserService.loginUser(usernameValue, passwordValue).then(r => {
            if (r) {
                setUsername(usernameValue)
                setBeforeLoginFormVisible(false)
            } else setWrongPwAlertVisible(true)
        }).catch(e => {
            alert('로그인 중 오류 발생. 관리자에게 문의 바람.')
        })
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
                    {wrongPwAlertVisible
                        ? <Alert variant={'danger'}>회원정보를 찾을 수 없습니다. 다시 입력해 주십시오.</Alert>
                        : null}
                </Col>
            </Row>
        </>
    )
}

export default LoginForm
