import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import feed from './Feed'


class UserProfile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            about: '',
            UserData: []
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
        console.log('hello')
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
    who = () => {
        let MyVideo = 'uploads.videoId'
        console.log(MyVideo)
    }
    // exit = () => {
    //     alert(`${this.props.UserData.username} you are Loging-Out`)
    //     this.props.deleteuser()
    // }
    getvideo = async () => {
        let username = localStorage.getItem('username')
        let password = localStorage.getItem('password')
        let user = await axios.get(`http://localhost:5000/username/${username}/password/${password}`)
        let movies=(user.data[0].uploads.map(v => v.videoId))
        return movies
    }
    componentDidMount = async () => {
        let data = await this.getvideo()
        this.setState({ UserData: data })
        return this.state.UserData


    }
    render() {

        return (

            < Router >
                <div className='userprofile'>
                    {this.props.UserData.username === undefined ?

                        <div class="login">
                            <input type="text" value={this.state.username} onChange={this.handleUserName} placeholder="User name" id="username" />
                            <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" id="password" />


                            <Link to="userprofile"><button onClick={this.UserExict} className="submit" type='submit'> LogIn <i class="far fa-hand-spock"></i></button></Link>
                            <div className="oasswordorusername"> Password or username is incorrect</div>
                            <Link className="signupbutton" to="/signup"><div className="sign">Sign-Up</div></Link>
                        </div>
                        :
                        <div>
                            {/* <Link to='/feed'>Feed</Link> */}
                            <a href="/feed">feed</a>

                            <div className='usernameprofile'> <i class="fas fa-user-alt"></i>

                                {this.props.UserData.username}</div>

                            <Link to='/' > <div onClick={this.exit} className="logOut"><i class="fas fa-walking"></i>
                                <i class="fas fa-door-open"></i>

                            </div></Link>
                            <form >
                                <label for="fname">About MySelf</label>
                                <input value={this.props.UserData.about} onChange={this.handleAbout} type="text" className="aboutmyself" name="fname" />
                                <div onClick={this.updateprofile}><i class="far fa-caret-square-up"></i></div>

                            </form>
                            <button onClick={this.who}>w</button>
                            <div>
                                {this.state.UserData.map(d =>
                                    <div>
                                        <video className="videos" width="300" height="200" controls>
                                            <source src={`http://localhost:5000/video/${d}`} />
                                        </video>

                                    </div>
                                )}
                            </div>
                        </div>}
                </div>
            </Router >

        );
    }

}

export default UserProfile;
