import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import UserSearch from './UserSearch';
import Feed from './Feed'
import UserPage from './UserPage';
import GridFeed from './GridFeed';
import axios from 'axios';
import Feedsecond from './Feedsecond'


class Landing extends Component {
    constructor() {
        super()
        this.state = {
            searchPut: '',
          

        }
    }
   

    searchPutChange = (event) => {
        const input = event.target.value
        this.setState({
            searchPut: input,

        })

    }

   


    render() {
        let userPic = this.props.allData.filter(u => u.username == localStorage.getItem("username")).map(p => p.profilePic)
        console.log(this.props.UserData.username)
        let data = this.props.allData
        let searchdata = data.filter(r => r.username.toLowerCase().includes(this.state.searchPut))

        return (

            <div >

                <div>

                    <ul>
                    
                    {localStorage.getItem("username") === 'undefined'? <li><div><a class="fas fa-home" href="/"></a></div></li>:<li><a class="fas fa-home" href="/feed"></a></li>}
                        {localStorage.getItem("username") === 'undefined'? null:<li><a href="/userprofile"><img className="usernameimg4" src={userPic} /></a></li>}
                        
                        {localStorage.getItem("username") === 'undefined' ? null :  <a href="/usersearch"><button className="inputcon" type="submit"><i class="fa fa-search"></i></button></a>}

                        {localStorage.getItem("username") === 'undefined' ? null  :  <input value={this.state.searchPut} onChange={this.searchPutChange} className="searchcontainer" type="text" placeholder="Search.." name="search" />}
                        <div className="vlogy">Vlogy</div>
                       
                    </ul>

                </div>
               




                <Router>


                    <Route path="/feed" exact render={() => <Feed />} />
                    <Route path="/" exact render={() => <Login UserData={this.props.UserData} UserExict={this.props.UserExict} />} />
                    <Route path="/signup" exact render={() => <Signup newUser={this.props.newUser} />} />
                    <Route path="/gridfeed" exact render={() => <Feedsecond />}/>
                    <Route path="/usersearch" exact render={() =>
                        this.state.searchPut === '' ?
                            data.map(r => <UserSearch allData={this.props.allData} username={r.username} following={r.following} followers={r.followers} />) :
                            searchdata.map(r => <UserSearch updateUser={this.props.updateUser} allData={this.props.allData} username={r.username} following={r.following} followers={r.followers} />)
                    } />

                    <Route path='/userprofile' exact render={() => <UserProfile updateUser={this.props.updateUser} allData={this.props.allData} updateprofile={this.props.updateprofile} deleteuser={this.props.deleteuser} UserExict={this.props.UserExict} UserData={this.props.UserData} />} />
                    <Route path='/user/:username' exact render={({ match }) => <UserPage updateUser={this.props.updateUser} match={match} UserData={this.props.UserData} />} />
                </Router>

            </div>


        )
    }
}

export default Landing

