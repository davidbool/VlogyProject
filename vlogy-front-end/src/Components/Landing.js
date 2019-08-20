import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserProfile from './UserProfile'

class Landing extends Component {
    constructor() {
        super()
        this.state = {


        }
    }


    render() {
console.log(this.props.UserData)
        
        return (

            <div >
                <Router>
                    <Route path="/" exact render={() => <Login UserData={this.props.UserData}  UserExict={this.props.UserExict} />} />
                    <Route path="/signup" exact render={() => <Signup newUser={this.props.newUser} />} />
                    <Route path='/userprofile' exact render={() => <UserProfile deleteuser={this.props.deleteuser}  UserExict={this.props.UserExict}  UserData={this.props.UserData}/>} /> 
                </Router>


            </div>


        )
    }
}

export default Landing

