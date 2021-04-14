import React, {Dispatch} from "react";
import {Form} from "react-bootstrap";

interface LoginStep2PageProps {
    setPasswordValue: Dispatch<React.SetStateAction<string>>
}

const LoginStep2Page: React.FC<LoginStep2PageProps> = ({setPasswordValue}) => {
return (
    <>
        <Form.Group controlId="id">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="암호" onChange={e => setPasswordValue(e.target.value)}/>
        </Form.Group>
    </>
)
}

export default LoginStep2Page
