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
      allData: []
    }
  }

  myData = async () => {
    let data = await axios.get('http://localhost:5000/users')
    let allData = data.data
    this.setState({
      allData
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

componentDidMount = async () => {
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
        <Landing allData={this.state.allData} newUser={this.newUser} deleteuser={this.deleteuser} UserData={this.state.UserData} UserExict={this.UserExict} newUser={this.newUser} />
      </div>
      </Router>
    ); 
  }
}

export default App;
