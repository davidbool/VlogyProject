import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            show: false
        }
    }


    handleUserName = (u) => {
        let username = u.target.value
        this.setState({
            username
        })
    }
    handleshow = () =>{
        this.setState({
            show: true
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
        if(UserData == undefined){
            this.handleshow()
            return
        }
        this.setState({
            handleshow: false
        })
        window.location.href = '/userprofile'
    }

   
    render() {
        return (
            <div >
                <div class="login">
                    <input type="text" value={this.state.username} onChange={this.handleUserName} placeholder="User name" id="username" />
                    <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" id="password" />

                  <button  onClick={this.UserExict} className="submit" type='submit'> LogIn <i class="far fa-hand-spock"></i></button>
                    {this.state.show?
                     <div className="oasswordorusername"> Password or username is incorrect</div>
                    : <div className="oasswordorusernamet"> type your user name and password</div>} 
                    <a className="signupbutton" href="/signup"><span className="sign">Sign-Up</span></a>
                </div>
            </div>

        )
    }
}

export default Login

