import React, {useEffect, useState} from 'react';
import NavBar from "./component/navBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import Common from './component/common';
import IndexForm from "./component/indexForm";
import BeforeLoginForm from "./component/beforeLoginForm";
import ProfileForm from "./component/profileForm";
import FooterForm from "./component/footerForm";
import UserService from "./service/user/userService";
import {BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
    const [username, setUsername] = useState<string | null>(null)
    const [beforeLoginFormVisible, setBeforeLoginFormVisible] = useState<boolean>(false)
    const [isLoginForm, setIsLoginForm] = useState<boolean>(false)
    const [profileFormVisible, setProfileFormVisible] = useState<boolean>(false)
    const [libName, setLibName] = useState<string>('mireaB1')
    useEffect(() => {
        UserService.getUsername().then(r => {
            setUsername(r)
        })
    })
    return (
        <BrowserRouter>
            <NavBar
                setBeforeLoginFormVisible={setBeforeLoginFormVisible}
                setIsLoginForm={setIsLoginForm}
                profileFormVisible={profileFormVisible}
                setProfileFormVisible={setProfileFormVisible}
                username={username}
                setLibName={setLibName}/>
            <Switch>
                <Route exact path={'/'}>
                    <Common.Blank/>
                    {!username && beforeLoginFormVisible
                        ? <BeforeLoginForm setBeforeLoginFormVisible={setBeforeLoginFormVisible}
                                           setUsername={setUsername}
                                           isLoginForm={isLoginForm} setIsLoginForm={setIsLoginForm}/>
                        : null}
                    {username && profileFormVisible
                        ? <ProfileForm setProfileFormVisible={setProfileFormVisible} setUsername={setUsername} username={username}/>
                        : null}
                    <IndexForm username={username} libName={libName}/>
                </Route>
                <Route path={'*'}>
                    Not Found.
                </Route>
            </Switch>
            <FooterForm/>
        </BrowserRouter>
    )
}

export default App
