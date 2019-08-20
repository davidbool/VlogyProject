import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],

    }
  }


  myData = async () => {
    let data = await axios.get('http://localhost:8080/Vlogs')
    data = data.data
    this.setState({
      data
    })
  }
  


  newClient = async (client) => {
    axios.post('http://localhost:8080/Video', client)
   
    this.myData()

  }

  

  componentDidMount = async () => {
    this.myData()
  }


  updateDescription = async (user) => {
     await axios.put(`http://localhost:8080/updateClient/${user.email}`, user)
    this.myData()
  }




  render() {
    return (
      <div className="App" >

       
      </div>
    );
  }

}

export default App;
