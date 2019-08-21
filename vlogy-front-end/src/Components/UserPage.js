import React, { Component } from 'react';
import axios from 'axios'


class UserPage extends Component {
    constructor(){
        super()
        this.state = {
            userdata: {}
        }
    }
        getUser = async() =>{
            let username = this.props.match.params.username
            let res = await axios.get(`http://localhost:5000/user/${username}`)
            return res.data
        }
        componentDidMount = async() =>{
           let userdata = await this.getUser()
           this.setState({
               userdata
           })
        }
    
    render()
    {
        return(<div>
            <h1>{this.state.userdata.name}</h1>
        </div>)
    }
}

export default UserPage