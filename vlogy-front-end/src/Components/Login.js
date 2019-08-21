import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            show:false
        }
    }

    handleshow = () => {
       
        this.setState({
            show:!this.state.show
        })
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
        this.handleshow()
    }

   
    render() {
        return (
            <div >
                <div class="login">
                    <input type="text" value={this.state.username} onChange={this.handleUserName} placeholder="User name" id="username" />
                    <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" id="password" />


                  <button   onClick={this.UserExict} className="submit" type='submit'> LogIn <i class="far fa-hand-spock"></i></button>
                   {this.props.UserData.username === undefined?
                    <div> {this.state.show? 
                    <div className="oasswordorusername"> Password or username is incorrect</div>: <div className="oasswordorusernamet"> type your user name and password</div>} </div>
                    :
                    window.location.href = '/userprofile' }
                    <br></br>

                    <a className="signupbutton" href="/signup"><span className="sign">Sign-Up</span></a>
                </div>
            </div>

        )
    }
}

export default Login

