
import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


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
        return res.data
    }
    componentDidMount = async () => {
        let userdata = await this.getUser()
        this.setState({
            userdata
        })
    }

    render() {


        return (




            <div>

                <a href="/feed">feed</a>

                <div className='usernameprofile'> <i class="fas fa-user-alt"></i>

                    {localStorage.getItem("username")}</div>

                <a href='/' > <div onClick={this.exit} className="logOut"><i class="fas fa-walking"></i>
                    <i class="fas fa-door-open"></i>

                </div></a>
                <form >
                    <label for="fname">About MySelf</label>
                    <input value={this.props.UserData.about} onChange={this.handleAbout} type="text" className="aboutmyself" name="fname" />
                    <div onClick={this.updateprofile}><i class="far fa-caret-square-up"></i></div>

                </form>

                <div>
                    {this.state.UserData.map(d =>
                        <div>
                            <video className="videos" width="300" height="200" controls>
                                <source src={`http://localhost:5000/video/${d}`} />
                            </video>

                        </div>
                    )}
                </div>
            </div>

        )
    }
}

export default UserPage