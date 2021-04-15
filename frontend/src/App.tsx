import React, {useState} from 'react';
import NavBar from "./component/navBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import Common from './component/common';
import IndexForm from "./component/indexForm";
import LoginForm from "./component/loginForm";
import ProfileForm from "./component/profileForm";

function App() {
    const [username, setUsername] = useState<string | null>(null)
    const [loginFormVisible, setLoginFormVisible] = useState<boolean>(false)
    const [profileFormVisible, setProfileFormVisible] = useState<boolean>(false)
    return (
        <div>
            <NavBar
                setLoginFormVisible={setLoginFormVisible}
                loginFormVisible={loginFormVisible}
                setProfileFormVisible={setProfileFormVisible}
                profileFormVisible={profileFormVisible}
                username={username}/>
            <Common.Blank/>
            {!username && loginFormVisible
                ? <LoginForm setUsername={setUsername}/>
                : null}
            {username && profileFormVisible
                ? <ProfileForm setProfileFormVisible={setProfileFormVisible} setUsername={setUsername}/>
                : null}
            <Common.Blank/>
            <IndexForm/>
        </div>
    )
}

export default App
