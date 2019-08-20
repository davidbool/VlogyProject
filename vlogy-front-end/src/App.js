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
      MovieData:[],
      data: [],
      UserData: []

    }
  }


  myData = async () => {
    let data = await axios.get('http://localhost:5000/users')
    data = data.data
    this.setState({
      data
    })
  }



  newUser = async (user) => {
    axios.post('http://localhost:5000/newUser', user)
    this.myData()
    console.log(this.state.data)



  UserExict = (login) => {
    axios.get(`http://localhost:5000/username/${login.username}/password/${login.password}`).then((res)=> {
      if (res.data[0] === undefined) {
        alert('User not found')

      } else {
        let UserData = res.data[0]
        this.setState({
          UserData
        }, function () {
          console.log(this.state.UserData)
        })
      }
    })
  }




  // componentDidMount = async () => {
  //   this.myData()
  // }






  render() {
    return (
      <Router>
        <div className="App" >


        </div>
        <Route path="/feed" exact render={() => <Feed data={this.state.MovieData}  />} />
      </Router>
      <div className="App" >
        <Landing UserExict={this.UserExict} newUser={this.newUser} />

      </div>
    );
  }

}

export default App;
