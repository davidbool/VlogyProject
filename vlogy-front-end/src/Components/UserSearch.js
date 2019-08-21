import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class UserSearch extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
            follow: false
        }

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


        return (


            <div>

                
                <div class="card">
                    <img src="" />
                    <div class="container">
                        <h4><b>{this.props.username}</b></h4>
                        {this.state.follow ? <div onClick={this.followbutton}><i class="fas fa-user-minus"></i>

                        </div> : <div onClick={this.followbutton} ><i class="fas fa-user-plus"></i>

                            </div>}

                        <p>following:{this.props.following}</p>
                        <p>followers:{this.props.followers}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSearch