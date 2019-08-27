import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserPage from './UserPage';

class UserSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            follow: this.chekFollowStatus(),

        }

    }

    chekFollowStatus = async() =>{
        let username = localStorage.getItem("username")
        let password = localStorage.getItem("password")
        let user = await axios.get(`http://localhost:5000/username/${username}/password/${password}`)
        let i = this.props.followers.findIndex(d => d == user.data[0]._id)
        if(this.props.followers.findIndex(d => d == user.data[0]._id) > -1){
            this.setState({
                follow : true
            })
        }
        else{
            this.setState({
            follow : false  
          })
        }
        return true
    }
    componentDidMount = () =>{
        this.chekFollowStatus()
    }
    followbutton = (f) => {
       
        if (this.state.follow == true) {
            alert('UNFRIENDED')
            this.setState({
                follow: !this.state.follow
            })

        } else {
            this.setState({
                follow: !this.state.follow
            })
        }
        let data ={
            follwer: localStorage.getItem("username"), 
            user: this.props.username
        }
        this.props.follow(data)
    }


    render() {
        console.log(this.props.followers)
        console.log(this.props.following)

        let urls = `/user/${this.props.username}`

        // console.log(this.props.allData.filter(u => u.username == localStorage.getItem("username")).map(p => p.profilePic))

        return (


            <div>


                <div class="card">
                    
                    <div class="container">
                        <h4><b>{this.props.username}</b></h4>
                        {this.state.follow ? <div onClick={this.followbutton}><i class="fas fa-user-minus"></i>

                        </div> : <div value={this.props.username} onClick={this.followbutton} > <i class="fas fa-user-plus"></i>

                            </div>}
                        {this.props.allData.filter(u => u.username == this.props.username).map(f => f.profilePic === undefined ?
                            <div> {this.props.username === localStorage.getItem("username") ?
                                <a href='/userprofile' ><i class="fas fa-user-alt"> </i> </a> :
                                <a href={urls} ><i class="fas fa-user-alt"> </i> </a>}</div> :
                            <div> {this.props.username === localStorage.getItem("username") ?
                                <a href='/userprofile'> <img className="usernameimg" src={f.profilePic} /> </a> :
                                <a href={urls}> <img className="usernameimg" src={f.profilePic} /> </a>}</div>
                        )}
                        <p>following:{this.props.following.length}</p>
                        <p>followers:{this.props.followers.length}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSearch