import React, { useState } from 'react';
import { Redirect } from 'react-router';

export default function LoginForm(props) {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()
    const [redirect, setRedirect] = useState()

    function handleLogin(e) {
        e.preventDefault();
        fetch('/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(response => response.json())
            .then(json => {
                if (json.token) {
                    localStorage.setItem('token', json.token);
                    props.setLoggedIn(true)
                    props.setUsername(json.user.username)
                    setRedirect(true)
                }
                else{
                    setMessage(json[Object.keys(json)[0]])
                }
            });
    };

    return (
        <>
            {redirect ?
                <Redirect to='/' />
                : null
            }
            <form onSubmit={e => handleLogin(e)}>
                <h2>Log In</h2>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <input type="submit" />
            </form>
            <p style={{textAlign: 'center'}}>{message}</p>
        </>
    );
}