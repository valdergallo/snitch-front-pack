import axios from 'axios';
import BASE_URL from '../static_vars'

const AUTH_TOKEN_URL = BASE_URL + "api-token/";

class Auth {
    logout() {
        delete localStorage.token
    }

    loggedIn() {
        return !!localStorage.token
    }

    login(username, pass) {
        console.log('AUTH_TOKEN_URL ' + AUTH_TOKEN_URL)
        axios.post(AUTH_TOKEN_URL, {
            username: username,
            password: pass
        })
        .then(function (response) {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user_id', response.data.id)
                window.location = "/home"
            } else {
                var error_msg = document.getElementById('error_msg');
                error_msg.innerHtml = toString(response.request.responseText)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export default Auth;