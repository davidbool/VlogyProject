import React, { Component } from 'react';
import { Link } from 'react-router-dom';





class Signup extends Component {
    constructor() {
        super()
        this.state = {
            fname: '',
            lname: '',
            DOB: '',
            username: '',
            password: '',
            passwordagain: ''

        }
    }

    handleInput = (f) => {
        let name = f.target.value
        let val = f.target.name
        this.setState({
            [val]: name,

        })
    }


    handleDOB = (d) => {
        let DOB = d.target.value
        this.setState({
            DOB
        })

    }

    handleUserName = (u) => {
        let username = u.target.value
        this.setState({
            username
        })
    }


    handlePassword = (p) => {
        let password = p.target.value
        this.setState({
            password
        })
    }

    handlePasswordagain = (pa) => {
        let passwordagain = pa.target.value
        this.setState({
            passwordagain
        })
    }

    signup = () => {
        let name = this.state.fname + " " + this.state.lname
        let DOB = this.state.DOB  
        let password = this.state.passwordagain
        let username = this.state.username
     
        console.log(`name:${name} ,birthday: ${DOB} ,password: ${password} ,username: ${username}`)
    }

    NotTheSamePass = () => {
        alert('not the same passwords. Please type a password again')
    }


    render() {



        return (

            <div>
                <div class="signup">
                    FirstName:<input name="fname" value={this.state.fname} onChange={this.handleInput} type="text" placeholder="" id="username" />
                    LastName:<input name="lname" value={this.state.lname} onChange={this.handleInput} type="text" placeholder="" id="username" />
                    Date of birth:<input value={this.state.DOB} onChange={this.handleDOB} type="date" placeholder="" id="username" />
                    UserName: <input value={this.state.username} onChange={this.handleUserName} type="text" placeholder="" id="username" />
                    Password:  <input value={this.state.password} onChange={this.handlePassword} type="password" placeholder="" id="password" />
                    Type your new password again: <input value={this.state.passwordagain} onChange={this.handlePasswordagain} type="password" placeholder="" id="password" />
                    {this.state.passwordagain === this.state.password ? <Link to='/' ><button className="submit" type='submit' onClick={this.signup}>  SignUp</button> </Link> : <button className="submit" type='submit' onClick={this.NotTheSamePass}>  SignUp</button>}
                </div>
            </div>



        )
    }
}

export default Signup

