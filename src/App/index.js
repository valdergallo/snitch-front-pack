import React, { Component } from 'react';
import logo from './img/logo.svg';
import './css/App.css';
import { Auth, Login, Logout } from '../Login/index'
import Menu from '../Menu/index'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Price from '../pages/Price'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

let auth = new Auth();

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.loggedIn() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
    )} />
)


class App extends Component {
    render() {
        return (
        <BrowserRouter>
        <div className="App" >
            <header className="App-header" >
                <img src={logo} alt={"logo"} height='20' align="left"/>
                <Menu />
            </header> 
            <section className="App-content">
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/contact" component={Contact} />
                <PrivateRoute path="/price" component={Price} /> 
            </section>
        </div>
        </BrowserRouter>
        );
    }
}

export default App;