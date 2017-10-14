import React, { Component } from 'react';
import axios from 'axios';
import { Auth } from '../Login/index'
import './css/Menu.css';
import { API_LINK_URL, API_TRACK_URL }  from '../static_vars';
import { Link, withRouter } from 'react-router-dom'

let auth = new Auth();
let config = {
    headers: {
        'Authorization': 'Token ' + localStorage.token
    }
}

var logoutLink = (
    <li>
    <Link to='/logout' id='0'>
        Logout
    </Link>
    </li>
)


class Menu extends Component {
    constructor(){
        super();
        if (auth.loggedIn()){
            this.loadLinks()
        }
        this.state = {
            'menuLinks': (<li><Link to="/login">Login</Link></li>),
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        
        var data = {
            'user': localStorage.getItem('user_id'),
            'page_link': e.currentTarget.id,
        }

        var self = this
        var gotoLink = e.currentTarget.name

        axios.post(API_TRACK_URL, data, config)
            .then(function (response) {
                console.log('Goto ' + gotoLink);
                self.props.history.push(gotoLink)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    loadLinks() {
        var self = this
        axios.get(API_LINK_URL, config)
            .then(function (response) {
                var menuLinks = response.data.map((response) =>
                    <li>
                        <Link to={response.url} name={response.url} id={response.id} onClick={self.handleClick} >
                            {response.display} 
                        </Link>
                    </li>
                );
                menuLinks.push(logoutLink)
                self.setState({'menuLinks': menuLinks})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="Menu" >
                <nav id='menu'>
                    <ul>
                        {this.state.menuLinks}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default withRouter(Menu);