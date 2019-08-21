import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';



class UserProfile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            about: ''


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
        console.log('hello')
        let UserData = await this.props.UserExict({ username: this.state.username, password: this.state.password })
        console.log(UserData)


    }

    handleAbout = (v) => {
        let about = v.target.value
        this.setState({
            about
        },function(){
            console.log(this.state.about)
        })
    }


    exit = () => {
        alert(`${this.props.UserData.username} you are Loging-Out`)
        this.props.deleteuser()
    }

    render() {

        return (
            <div className='userprofile'>
                {this.props.UserData.username === undefined ?

                    <div>
                        <Link to='/'><i class="fas fa-arrow-circle-left"></i></Link>
                        <div>Page not found.</div> </div>
                    :
                    <div>
                        <Link to='/feed'>Feed</Link>

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
                    </div>}







            </div>
        );
    }

}

export default UserProfile;
