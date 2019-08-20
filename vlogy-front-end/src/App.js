import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Feed from './Components/Feed';


class App extends Component {
  constructor() {
    super()
    this.state = {
      MovieData:[],

    }
  }


  // myData = async () => {
  //   let data = await axios.get('http://localhost:8080/Vlogs')
  //   data = data.data
  //   this.setState({
  //     data
  //   })
  // }



  // newClient = async (client) => {
  //   axios.post('http://localhost:8080/Video', client)

  //   this.myData()

  // }



  // componentDidMount = async () => {
  //   this.myData()
  // }


  // updateDescription = async (user) => {
  //    await axios.put(`http://localhost:8080/updateClient/${user.email}`, user)
  //   this.myData()
  // }




  render() {
    return (
      <Router>
        <div className="App" >


        </div>
        <Route path="/feed" exact render={() => <Feed data={this.state.MovieData}  />} />
      </Router>
    );
  }

}

export default App;
