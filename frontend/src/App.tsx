import React, {useState} from 'react';
import NavBar from "./component/navBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import Common from './component/common';
import IndexForm from "./component/indexForm";
import BeforeLoginForm from "./component/beforeLoginForm";
import ProfileForm from "./component/profileForm";
import FooterForm from "./component/footerForm";

function App() {
    const [username, setUsername] = useState<string | null>(null)
    const [beforeLoginFormVisible, setBeforeLoginFormVisible] = useState<boolean>(false)
    const [isLoginForm, setIsLoginForm] = useState<boolean>(false)
    const [profileFormVisible, setProfileFormVisible] = useState<boolean>(false)
    const [libName, setLibName] = useState<string>('mireaB1')
    return (
        <div>
            <NavBar
                setBeforeLoginFormVisible={setBeforeLoginFormVisible}
                setIsLoginForm={setIsLoginForm}
                profileFormVisible={profileFormVisible}
                setProfileFormVisible={setProfileFormVisible}
                username={username}
                setLibName={setLibName}/>
            <Common.Blank/>
            {!username && beforeLoginFormVisible
                ? <BeforeLoginForm setBeforeLoginFormVisible={setBeforeLoginFormVisible} setUsername={setUsername}
                                   isLoginForm={isLoginForm} setIsLoginForm={setIsLoginForm}/>
                : null}
            {username && profileFormVisible
                ? <ProfileForm setProfileFormVisible={setProfileFormVisible} setUsername={setUsername}/>
                : null}
            <IndexForm username={username} libName={libName}/>
            <FooterForm/>
        </div>
    )
}

export default App
