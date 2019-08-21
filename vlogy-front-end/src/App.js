import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Landing from './Components/Landing';



class App extends Component {
  constructor() {
    super()
    this.state = {
      MovieData: [],
      data: [],
      UserData: {},
      AllData:[]

    }
  }

  myData = async () => {
    let data = await axios.get('http://localhost:5000/users')
    let AllData = data.data
    this.setState({
      AllData
    })
  }


  newUser = async (user) => {
    axios.post('http://localhost:5000/newUser', user)
    this.myData()
    console.log(this.state.data)
  }

  UserExict = async(login) => {
    let res = await axios.get(`http://localhost:5000/username/${login.username}/password/${login.password}`)
      if (res.data[0] === undefined) {
        console.log('User not found')

      } else {
        let UserData = res.data[0]
        localStorage.setItem("username", UserData.username)
        localStorage.setItem("password", UserData.password)
        this.setState({
          UserData
        }, function () {
          console.log(this.state.UserData)
        })
        
      }
    return res.data[0]
  }

  getFeed = async () => {
    let filname = await axios.get('http://localhost:5000/files')
    console.log(filname)
    return filname.data.map(d => d.filename)

}

componentDidMount = async () => {
    let data = await this.getFeed()
    this.setState({ data })
    this.myData()

}


  deleteuser=()=>{
    this.setState({
        UserData:{}
    })}

  
  render() {
    return (
      <Router>
        <div className="App" >
      
        <Landing AllData={this.state.AllData} newUser={this.newUser} deleteuser={this.deleteuser} UserData={this.state.UserData} UserExict={this.UserExict} newUser={this.newUser} />
      </div>
      </Router>
    ); 
  }
}

export default App;
