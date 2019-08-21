
import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


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
    
    render() {


        return (


            <div>


                <div>




                    <div className='usernameprofile'> <i class="fas fa-user-alt"></i>

                        </div>
                    
                    <form >
                       
                      

                    </form>
                </div>


            </div>
        )
        }
    }
export default UserPage