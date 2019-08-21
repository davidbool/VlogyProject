import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import UserSearch from './UserSearch';
import Feed from './Feed'
import UserPage from './UserPage';


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
        console.log(this.props.UserData.username)
        let data = this.props.allData
        let searchdata = data.filter(r => r.username.toLowerCase().includes(this.state.searchPut))

        return (

            <div >

                <div>

                    <ul>
                    {localStorage.getItem("username") === 'undefined'? <li><a class="active" href="/">Feed</a></li>:<li><a class="active" href="/feed">Feed</a></li>}
                        {localStorage.getItem("username") === 'undefined'? null:<li><a href="/userprofile">My Profile</a></li>}
                        
                        {localStorage.getItem("username") === 'undefined' ? <button className="inputcon" type="submit"><i class="fa fa-search"></i></button> : <a href="/usersearch"><button className="inputcon" type="submit"><i class="fa fa-search"></i></button></a>}

                        <input value={this.state.searchPut} onChange={this.searchPutChange} className="searchcontainer" type="text" placeholder="Search.." name="search" />

                    </ul>

                </div>

                <Router>


                    <Route path="/feed" exact render={() => <Feed />} />
                    <Route path="/" exact render={() => <Login UserData={this.props.UserData} UserExict={this.props.UserExict} />} />
                    <Route path="/signup" exact render={() => <Signup newUser={this.props.newUser} />} />

                    <Route path="/usersearch" exact render={() =>
                        this.state.searchPut === '' ?
                            data.map(r => <UserSearch username={r.username} following={r.following} followers={r.followers} />) :
                            searchdata.map(r => <UserSearch username={r.username} following={r.following} followers={r.followers} />)
                    } />

                    <Route path='/userprofile' exact render={() => <UserProfile updateprofile={this.props.updateprofile} deleteuser={this.props.deleteuser} UserExict={this.props.UserExict} UserData={this.props.UserData} />} />
                    <Route path='/user/:username' exact render={({ match }) => <UserPage match={match} />} />
                </Router>

            </div>


        )
    }
}

export default Landing

