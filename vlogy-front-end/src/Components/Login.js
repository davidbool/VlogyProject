import React, { Component } from 'react';
import { Link } from 'react-router-dom'



class Login extends Component {
    constructor() {
        super()
        this.state = {
            


        }
    }



    render() {


        return (

            <div >
                <div class="login">
                    <input type="text" placeholder="User name" id="username" />
                    <input type="text" placeholder="Password" id="password" />
                    <button className="submit" type='submit'> LogIn</button>
                    <Link className="signupbutton" to="/signup"><div>Sign-Up</div></Link>

                </div>

            </div>


        )
    }
}

export default Login

