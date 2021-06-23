import React, {Dispatch, SetStateAction} from "react";
import {Container} from "react-bootstrap";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import Common from "./common";

interface BeforeLoginFormProps {
    setUsername: Dispatch<SetStateAction<null | string>>
    isLoginForm: boolean
    setIsLoginForm: Dispatch<SetStateAction<boolean>>
    setBeforeLoginFormVisible: Dispatch<SetStateAction<boolean>>
}

const BeforeLoginForm: React.FC<BeforeLoginFormProps> = ({setUsername, isLoginForm, setIsLoginForm, setBeforeLoginFormVisible}) => {
    return (
        <>
            <Container>
                {isLoginForm
                    ? <LoginForm setBeforeLoginFormVisible={setBeforeLoginFormVisible} setUsername={setUsername}/>
                    : <RegisterForm setIsLoginForm={setIsLoginForm}/>}
                <Common.Blank/>
                <hr/>
            </Container>
        </>
    )
}

export default BeforeLoginForm
