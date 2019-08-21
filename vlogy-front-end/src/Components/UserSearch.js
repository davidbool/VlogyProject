import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserPage from './UserPage';


class UserSearch extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
            follow: false,
            following: ''

        }

    }

    handlefollowing = (f) => {
        let following = f.target.value
        this.setState({
            following
        }, function () { this.updatefollowing() })
        console.log(this.state.following)

    }


    updatefollowing = () => {
        let datas = this.props.updateUser({ data: this.state.following, prop: 'following', username: localStorage.getItem("username") })
        console.log(datas)
    }


    followbutton = () => {
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

        console.log(this.state.follow)
    }


    render() {

        let urls = `/user/${this.props.username}`

        // console.log(this.props.allData.filter(u => u.username == localStorage.getItem("username")).map(p => p.profilePic))

        return (


            <div>


                <div class="card">
                    <img src="" />
                    <div class="container">
                        <h4><b>{this.props.username}</b></h4>
                        {this.state.follow ? <div onClick={this.followbutton}><i class="fas fa-user-minus"></i>

                        </div> : <div onClick={this.followbutton} > <div value={this.props.username} onChange={this.handlefollowing} ><i class="fas fa-user-plus"></i></div>

                            </div>}
                        {this.props.allData.filter(u => u.username == this.props.username).map(f => f.profilePic === undefined ?
                            <div> {this.props.username === localStorage.getItem("username") ?
                                <a href='/userprofile' ><i class="fas fa-user-alt"> </i> </a> :
                                <a href={urls} ><i class="fas fa-user-alt"> </i> </a>}</div> :
                            <div> {this.props.username === localStorage.getItem("username") ?
                                <a href='/userprofile'> <img className="usernameimg" src={f.profilePic} /> </a> :
                                <a href={urls}> <img className="usernameimg" src={f.profilePic} /> </a>}</div>
                        )}
                        <p>following:{this.props.following}</p>
                        <p>followers:{this.props.followers}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSearch