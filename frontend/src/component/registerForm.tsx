import React, {Dispatch} from "react";
import {Card, FormControl, InputGroup} from "react-bootstrap";

interface RegisterFormProps {
    setPasswordValue: Dispatch<React.SetStateAction<string>>
}

const RegisterForm: React.FC<RegisterFormProps> = ({setPasswordValue}) => {
    return (
        <>
            <InputGroup className={'mb-3'}>
                <InputGroup.Prepend>
                    <InputGroup.Text>Password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder={'암호'} type={"password"} onChange={e => setPasswordValue(e.target.value)}/>
            </InputGroup>
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
        </>
    )
}

export default RegisterForm
