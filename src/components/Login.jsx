import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fetchToken } from "./Token";
import { postAPI } from "./Adapters";

export default function Login() {
    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const loginData = new URLSearchParams({
        grant_type: '',
        username: username,
        password: password,
        scope: '',
        client_id: '',
        client_secret: ''
    });

    const handleLogin = () => {
        if(username.length === 0) {
            alert("Username has left Blank!");
        }
        else if(password.length === 0){
            alert("password has left Blank!");
        }
        else {
            postAPI("/token", loginData)
            .then(
                response => {
                    navigate("/", {state: {from: location}})
                    console.log("Login response: ", response);
                }
            )
            .catch(
                error => {
                    console.log("Login Error: ", error);
                }
            )
        }
    }

    return (
        <>
            {
                fetchToken() ?
                (
                    <h1>Hello {username}. You are logged in</h1>
                ) : (
                <>
                <div className="wrapper">
                    <h1>Login</h1>
                    <form>
                        <div className="form-outline">
                        {/* <label htmlFor="username" className="form-label">Username: </label> */}
                        <input type="text" className="form-control form-control-lg" name="username" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                       
                         <div className="form-outline">
                        {/* <label htmlFor="password" className="form-label">Password: </label> */}
                            <input type="text" className="form-control form-control-lg" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <input type="button" className="btn btn-success btn-lg" name="submit" id="submit" value="Login" onClick={handleLogin} />
                    </form>
                </div>
                </>
                )
            }
    </>
    )
}