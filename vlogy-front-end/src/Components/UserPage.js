
import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import VideoUserP from './VideoUserP'
import Feed from './Feed';
import FeedVideo from './FeedVideo'


class UserPage extends Component {
    constructor() {
        super()
        this.state = {
            userdata: {}
        }
    }



    getUser = async () => {
        let username = this.props.match.params.username
        let res = await axios.get(`http://localhost:5000/user/${username}`)
        this.setState({
            userdata: res.data
        })
    }

    componentDidMount = async () => {
        this.getUser()
    }

    likeVid = (data) =>{
        axios.put('http://localhost:5000/like', data)
      .then( (response) => {
        this.getUser()
      })
    }
    comment = (data) => {
        console.log(data)
        axios.put('http://localhost:5000/addComment', data)
            .then((response) => {
                console.log(response)
                this.getUser()
            })
        }

    deleteComment = (data) =>{
            axios({
                method: 'delete',
                url: 'http://localhost:5000/comment',
                data: data
                }).then((response) => {
                this.getUser()
                })
    }    

    deleteuser = () => {
        localStorage.username = { 'username': localStorage.getItem("username") };
        localStorage.username = undefined
    }


    render() {
        return (
            <div className='userprofile'>

                <div>


                    <div className='usernameprofile'> <img className="usernameimg" src={this.state.userdata.profilePic} /> <div >   </div>



                        <a href='/' > <div onClick={this.deleteuser} className="logOut"><i class="fas fa-walking"></i>
                            <i class="fas fa-door-open"></i>

                        </div></a>
                        <form >

                            <label for="fname">About {this.state.userdata.username}</label>
                            <div type="text" className="aboutmyself" name="fname" >{this.state.userdata.about} </div>

                        </form>

                        <div >
                            {!this.state.userdata.uploads ? null : this.state.userdata.uploads.map(d =><div className="vidcontainer"  >
                             <VideoUserP deleteComment={this.deleteComment} comment ={this.comment} likeVid={this.likeVid} d={d} username={this.state.userdata.username} />
                           </div> )}

                        </div>

                    </div>
                </div>
            </div>


        )
    }
}

export default UserPage