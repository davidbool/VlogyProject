import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import feed from './Feed'
import Login from './Login';


class UserProfile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            about: '',
            showlogout: false,
            UserData: [],
            img: '',
            editimg: false
        }
    }

    handleeditimg = () => {

        this.setState({
            editimg: !this.state.editimg
        })
    }


    handleUserName = (u) => {
        let username = u.target.value
        this.setState({
            username
        })
    }


    handleimg = (u) => {
        let img = u.target.value
        this.setState({
            img
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
    exit = () => {
        alert(`${this.props.UserData.username} you are Loging-Out`)
        this.deleteuser()
    }


    getvideo = async () => {
        let username = localStorage.getItem('username')
        let password = localStorage.getItem('password')
        let user = await axios.get(`http://localhost:5000/username/${username}/password/${password}`)
        let movies = (user.data[0].uploads.map(v => v.videoId))
        return movies
    }
    componentDidMount = async () => {
        let data = await this.getvideo()
        this.setState({ UserData: data })
        return this.state.UserData


    }

    deleteuser = () => {
        localStorage.username = { 'username': localStorage.getItem("username") };
        localStorage.username = undefined
    }


    render() {


        console.log(this.props.UserData.username)
        return (

            < Router >
                <div className='userprofile'>
                    {/* {localStorage.getItem("username") === undefined ?

                        <div class="login">
                            <input type="text" value={this.state.username} onChange={this.handleUserName} placeholder="User name" id="username" />
                            <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" id="password" />


                            <button onClick={this.UserExict} className="submit" type='submit'> LogIn <i class="far fa-hand-spock"></i></button>
                            
                            <div className="oasswordorusername"> Password or username is incorrect</div>
                            <a className="signupbutton" href="/signup"><span className="sign">Sign-Up</span></a>
                        </div>
                        : */}
                    <div>



                        {this.state.img === '' || this.state.editimg === true ?
                            <div><input className="imginput" value={this.state.img} onChange={this.handleimg} placeholder="put image url" /> <div className='usernameprofile'> <i class="fas fa-user-alt"> </i>

                                {localStorage.getItem("username")}</div> </div> :
                            <div className='usernameprofile'> <img className="usernameimg" src={this.state.img} /> <i onClick={this.handleeditimg} class="fas fa-user-edit"></i> {localStorage.getItem("username")}  </div>}

                        {/* <div className='usernameprofile'> <i class="fas fa-user-alt"></i>

                            {localStorage.getItem("username")}</div> */}

                        <a href='/' > <div onClick={this.exit} className="logOut"><i class="fas fa-walking"></i>
                            <i class="fas fa-door-open"></i>

                        </div></a>
                        <form >
                            <label for="fname">About MySelf</label>
                            <input value={this.props.UserData.about} onChange={this.handleAbout} type="text" className="aboutmyself" name="fname" />
                            {/* <div onClick={this.updateprofile}><i class="far fa-caret-square-up"></i></div> */}

                        </form>

                        <div>
                            {this.state.UserData.map(d =>
                                <div>
                                    <video className="videos" width="400" height="300" controls>
                                        <source src={`http://localhost:5000/video/${d}`} />
                                    </video>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Router >
        );
    }


}
export default UserProfile;
