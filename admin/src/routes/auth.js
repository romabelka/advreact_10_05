import React, { Component } from 'react'
import {NavLink, Route} from 'react-router-dom'
import SignInForm from '../components/auth/sign-in'
import SignUpForm from '../components/auth/sign-up'

class AuthPage extends Component {
    render() {
        return (
            <div>
                <h1>Please sign in</h1>
                <div>
                    <NavLink to = "/auth/sign-in" activeStyle = {{ color: 'red' }}>Sign In</NavLink>
                    <NavLink to = "/auth/sign-up" activeStyle = {{ color: 'red' }}>Sign Up</NavLink>
                </div>
                <Route path = "/auth/sign-in" render = {() => <SignInForm onSubmit = {this.signIn}/>}/>
                <Route path = "/auth/sign-up" render = {() => <SignUpForm onSubmit = {this.signUp}/>}/>
            </div>
        )
    }

    signIn = ({ email, password }) => console.log('---', 'sign in', { email, password })
    signUp = ({ email, password }) => console.log('---', 'sign up', { email, password })
}

export default AuthPage