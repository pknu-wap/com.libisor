import React, {useState} from 'react';
import NavBar from "./component/navBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import Common from './component/common';
import IndexPage from "./component/indexPage";
import LoginPage from "./component/loginPage";

function App() {
    const [username, setUsername] = useState<string | null>(null)
    const [loginFormVisible, setLoginFormVisible] = useState<boolean>(false)
    return (
        <div>
            <NavBar setLoginFormVisible={setLoginFormVisible} username={username}/>
            <Common.Blank/>
            {!username && loginFormVisible
                ? <LoginPage setUsername={setUsername}/>
                : null}
            <Common.Blank/>
            <IndexPage/>
        </div>
    )
}

export default App;
