import React, {Dispatch} from "react";
import {FormControl, InputGroup} from 'react-bootstrap';

interface LoginStep2FormProps {
    setPasswordValue: Dispatch<React.SetStateAction<string>>
}

const LoginStep2Form: React.FC<LoginStep2FormProps> = ({setPasswordValue}) => {
    return (
        <>
            <InputGroup className={'mb-3'}>
                <InputGroup.Prepend>
                    <InputGroup.Text>Password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder={'암호'} type={"password"} onChange={e => setPasswordValue(e.target.value)}/>
            </InputGroup>
        </>
    )
}

export default LoginStep2Form
