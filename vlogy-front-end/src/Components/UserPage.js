
import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import VideoUserP from './VideoUserP'


class UserPage extends Component {
    constructor() {
        super()
        this.state = {
            userdata: {},
            

        }
    }



    getUser = async () => {
        let username = this.props.match.params.username
        let res = await axios.get(`http://localhost:5000/user/${username}`)
        return res.data
    }

    componentDidMount = async () => {
        let userdata = await this.getUser()
        await this.setState({
            userdata
        })
        this.state.userdata.uploads.forEach(r => console.log(r.videoId))
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

                        <div>
                            {!this.state.userdata.uploads ? null : this.state.userdata.uploads.map(d =>
                             <VideoUserP updateUser={this.props.updateUser} updateUserVideo={this.props.updateUserVideo} d={d} username={this.state.userdata.username} />
                            )}
                        </div>

                    </div>
                </div>
            </div>


        )
    }
}

export default UserPage