import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Feed from './Components/Feed';
import Landing from './Components/Landing'


class App extends Component {
  constructor() {
    super()
    this.state = {
      MovieData: [],
      data: [],
      UserData: {}

    }
  }

  // myData = async () => {
  //   let data = await axios.get('http://localhost:5000/users')
  //   data = data.data
  //   this.setState({
  //     data
  //   })
  // }


  newUser = async (user) => {
    axios.post('http://localhost:5000/newUser', user)
    this.myData()
    console.log(this.state.data)
  }

  UserExict = async(login) => {
    let res = await axios.get(`http://localhost:5000/username/${login.username}/password/${login.password}`)
      if (res.data[0] === undefined) {
        alert('User not found')

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

}


  deleteuser=()=>{
    this.setState({
        UserData:{}
    })}

  

  render() {
    return (
      <Router>
        <div className="App" >
          <div className='main-links'>
      
          
          </div>
         <div>
          <Route path="/feed" exact render={() => <Feed UserData={this.state.UserData} data={this.state.data}  />} />
        </div>
        <Landing  newUser={this.newUser} deleteuser={this.deleteuser} UserData={this.state.UserData} UserExict={this.UserExict} newUser={this.newUser} />
      </div>
      </Router>
    ); 
  }
}

export default App;
