import React, {useState} from 'react';
import NavBar from "./component/navBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import Common from './component/common';
import IndexForm from "./component/indexForm";
import LoginForm from "./component/loginForm";
import ProfileForm from "./component/profileForm";
import Footer from "./component/Footer";

function App() {
    const [username, setUsername] = useState<string | null>(null)
    const [loginFormVisible, setLoginFormVisible] = useState<boolean>(false)
    const [profileFormVisible, setProfileFormVisible] = useState<boolean>(false)
    const [libName, setLibName] = useState<string>('mireaF1Dummy')
    return (
        <div>
            <NavBar
                setLoginFormVisible={setLoginFormVisible}
                loginFormVisible={loginFormVisible}
                setProfileFormVisible={setProfileFormVisible}
                profileFormVisible={profileFormVisible}
                username={username}
                setLibName={setLibName}/>
            <Common.Blank/>
            {!username && loginFormVisible
                ? <LoginForm setUsername={setUsername}/>
                : null}
            {username && profileFormVisible
                ? <ProfileForm setProfileFormVisible={setProfileFormVisible} setUsername={setUsername}/>
                : null}
            <Common.Blank/>
            <IndexForm username={username} libName={libName}/>
            <Footer/>
        </div>
    )
}

export default App
