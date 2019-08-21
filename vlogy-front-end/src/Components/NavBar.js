
import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class NavBar extends Component {
    constructor() {
        super()
        this.state = {


        }

    }



    render() {


        return (


            <div>

                <ul>
                    <li><a class="active" href="/feed">Feed</a></li>
                    <li><a href="/userprofile">My Profile</a></li>
                    <input className="searchcontainer" type="text" placeholder="Search.." name="search"/>
                        <button className="inputcon" type="submit"><i class="fa fa-search"></i></button>
                </ul>

            </div>
                )
            }
        }
        
        export default NavBar
