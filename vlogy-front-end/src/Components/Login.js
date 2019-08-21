import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
        }
    }


    handleUserName = (u) => {
        let username = u.target.value
        this.setState({
            username
        })
    }


    handlePassword = (p) => {
        let password = p.target.value
        this.setState({
            password
        })
    }

    UserExict = async () => {
        let UserData = await this.props.UserExict({ username: this.state.username, password: this.state.password })
        console.log(UserData)
    }

   
    render() {
        return (
            <div >
                <div class="login">
                    <input type="text" value={this.state.username} onChange={this.handleUserName} placeholder="User name" id="username" />
                    <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" id="password" />

                    
                   <Link to="userprofile"><button onClick={this.UserExict} className="submit" type='submit'> LogIn <i class="far fa-hand-spock"></i></button></Link> 
                    <Link className="signupbutton" to="/signup"><div className="sign">Sign-Up</div></Link>
                </div>
            </div>

        )
    }
}

export default Login

