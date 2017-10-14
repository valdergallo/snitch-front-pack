import React, { Component } from 'react';
import Auth from './Auth';
import { Link, withRouter } from 'react-router-dom'
import './css/Login.css';

class Login extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        var username = this.refs.username.value;
        var pass = this.refs.pass.value;

        let auth = new Auth();
        var self = this 

        auth.login(username, pass, (loggedIn) => {
            if (loggedIn) {
                self.props.history.push('/home')
            }
        })
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="username" ref="username" />
                    <input type="password" placeholder="password" ref="pass" />
                    <input type="submit" />
                </form>
                <div className='error_msg' id="error_msg"></div>
            </div>
        )
    }
}

class Logout extends Component {
    constructor(){
        super();
        this.state = {
            'menuLinks': (<li><Link to="/login">Login</Link></li>),
        }

        let auth = new Auth();
        auth.logout();
        window.location = '/login'
    }

    render() {
        return (
            <div className='content'>
                <h2>Logout...</h2>
            </div>
        )
    }
}

export { Logout }

var logoutWithRoute = withRouter(Logout)

export { Login, Auth, logoutWithRoute };