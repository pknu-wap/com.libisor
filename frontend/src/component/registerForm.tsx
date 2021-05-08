import React, {Dispatch} from "react";
import {FormControl, InputGroup} from "react-bootstrap";

interface RegisterFormProps {
    setMail: Dispatch<React.SetStateAction<string>> | null
}

const RegisterForm: React.FC<RegisterFormProps> = ({setMail}) => {
    return (
        <>
            <InputGroup className={'mb-3'}>
                <InputGroup.Prepend>
                    <InputGroup.Text>Password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder={'암호'} type={"password"}/>
            </InputGroup>
            <InputGroup className={'mb-3'}>
                <InputGroup.Prepend>
                    <InputGroup.Text>Password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder={'암호'} type={"password"}/>
            </InputGroup>
        </>
    )
}

export default RegisterForm
