import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Landing extends Component {
    constructor() {
        super()
        this.state = {


        }
    }



    render() {


        return (

            <div >
                <Router>
                    <Route path="/" exact render={() => <Login />} />
                    <Route path="/signup" exact render={() => <Signup />} />
                    
                </Router>


            </div>


        )
    }
}

export default Landing

