import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';



class UserProfile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            about: '',
            showlogout: false
        }
    }


    handleUserName = (u) => {
        let username = u.target.value
        this.setState({
            username
        })
    }

    handleshow = () => {

        this.setState({
            showlogout: !this.state.showlogout
        })
    }

    handlePassword = (p) => {
        let password = p.target.value
        this.setState({
            password
        })
    }

    UserExict = async () => {
        console.log('hello')
        let UserData = await this.props.UserExict({ username: this.state.username, password: this.state.password })
        console.log(UserData)
    }

    handleAbout = (v) => {
        let about = v.target.value
        this.setState({
            about
        }, function () {
            console.log(this.state.about)
        })
    }



    render() {
console.log(this.props.UserData.username)
        return (
            <Router>

                <div className='userprofile'>
                    {/* {this.props.UserData.username === undefined ?

                        <div class="login">
                            <input type="text" value={this.state.username} onChange={this.handleUserName} placeholder="User name" id="username" />
                            <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" id="password" />


                            <Link to="/userprofile"><button onClick={this.UserExict} className="submit" type='submit'> LogIn <i class="far fa-hand-spock"></i></button></Link>
                            <div className="oasswordorusername"> Password or username is incorrect</div>

                            <a className="signupbutton" href="/signup"><div className="sign">Sign-Up</div></a>
                        </div>
                        : */}
                        <div>

                          
                            

                            <div className='usernameprofile'> <i class="fas fa-user-alt"></i>

                                {this.props.UserData.username} </div>
                                <div>
                            {this.state.showlogout ? <div className="logiingout">Are you sure you want to log out? <a href="/" ><button>Log out</button> </a></div> : null}</div>
                            <div onClick={this.handleshow} className="logOut"><i class="fas fa-walking"></i>
                                <i class="fas fa-door-open"></i>

                            </div>
                            <form >
                                <label for="fname">About MySelf</label>
                                <input value={this.props.UserData.about} onChange={this.handleAbout} type="text" className="aboutcontainer" name="fname" />
                                <div onClick={this.updateprofile}><i class="far fa-caret-square-up"></i></div>

                            </form>
                        </div>

                </div>
            </Router>
        );
    }

}

export default UserProfile;
