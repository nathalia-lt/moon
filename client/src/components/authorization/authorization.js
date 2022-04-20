import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./authorization.css"
import {animateScroll as ScrollAction} from 'react-scroll';


function Authorization( {user, setUser, onLogin, logout, setUserFavorites} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    let history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {onLogin(user)
                    setUserFavorites(user.favoritelocations)})
                    history.push("./")
                }
            else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }


    //a funcao scroolltop/bottom, faz com que a pagina pule para outra, como se fosse 
    //uma nova pagina mas na verdade e a mesma. Nao esquecer de importar a funcao animate scroll.
    function scrollTop(){
        ScrollAction.scrollToTop();
        // window.scrollTo(0,1000)
    } 
    function scrollBottom(){
        ScrollAction.scrollToBottom();
    }

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [signUpUserName, setSignUpUserName] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");


    function handleSignUpSubmit(e) {
        e.preventDefault();
        setErrors([]);
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                username: signUpUserName,
                password: signUpPassword,
                password_confirmation: passwordConfirmation,
            }),
        }).then((r) => {
            if (r.ok) { setUser(r.data)
                history.push('./')
                // window.location.reload
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (

        <div className="authorization">

<div >
  <div className='light x1'></div>
  <div className='light x2'></div>
  <div className='light x3'></div>
  <div className='light x4'></div>
  <div className='light x5'></div>
  <div className='light x6'></div>
  <div className='light x7'></div>
  <div className='light x8'></div>
  <div className='light x9'></div>
</div>
        <div className="formContainer">
            <section className="loginformauth">
                <div className="login-center">
                    <h1>Login</h1>
                    <hr className="formhr" />
                    <form  className='login-form' onSubmit={handleSubmit}>

                        <input className="userlogin"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input className="userlogin"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="formSubmit" type="submit">{user ? "Logout" : "Login"}</button>
                        <span>
                            {errors.map((err) => (
                                <span key={err}>{err}</span>
                            ))}
                        </span>

                    </form>
                    <div className="signscrollbuttonwrapper">
                    <label className="signscrollbutton" >Not a user?</label>
                    <button onClick={scrollBottom} className="signscroll" >Sign up here  </button>   
                    </div> 
                </div>
            </section>
        </div>
        <hr></hr> 
        {/* hr makes a linha para separar as coisas */}
        <div className="formContainer">
            <section className="form">
                <div className="center">
                    <h1 className="formh1">Sign Up</h1>
                    <hr className="formHr" />

                    <form className='login-form' onSubmit={handleSignUpSubmit}>
                        <input 
                            type="text"
                            className="usersignup"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <input 
                            type="text"
                            className="usersignup"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <input
                            type="text"
                            className="usersignup"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="text"
                            className="usersignup"
                            name="username"
                            placeholder="Username"
                            value={signUpUserName}
                            onChange={(e) => setSignUpUserName(e.target.value)}
                        />

                        <input
                            type="password"
                            className="usersignup"
                            name="password"
                            placeholder="Password"
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            className="usersignup"
                            name="password confirmation"
                            placeholder="Confirm Password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />

                        <button className="formSubmit" type="submit">Sign Up</button>

                        <span>
                            {errors.map((err) => (
                                <span key={err}>{err}</span>
                            ))}
                        </span>

                    </form>
                    <div className="signscrollbuttonwrapper" >
                    <button onClick={scrollTop} className="signscroll" >Log in here  </button>    
                    </div>
                </div>
            </section>
        </div>


        </div>
    )

}

export default Authorization