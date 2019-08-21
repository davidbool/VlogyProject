import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import UserSearch from './UserSearch';
import Feed from './Feed'
import UserPage from './UserPage';
import NavBar from './NavBar'

class Landing extends Component {
    constructor() {
        super()
        this.state = {
          
        }
    }

  render() {        
        return (

            <div >
                <Router>
                <NavBar />
                   
                <Route path="/feed" exact render={() => <Feed />} />
                    <Route path="/" exact render={() => <Login UserData={this.props.UserData}  UserExict={this.props.UserExict} />} />
                    <Route path="/signup" exact render={() => <Signup newUser={this.props.newUser} />} />
                    <Route path='/userprofile' exact render={() => <UserProfile updateprofile={this.props.updateprofile} deleteuser={this.props.deleteuser}  UserExict={this.props.UserExict}  UserData={this.props.UserData}/>} />
                    <Route path='/user/:username' exact render ={ ({match}) => <UserPage match={match} />} />
                </Router>
    
            </div>


                )
            }
        }
        
        export default Landing
        
