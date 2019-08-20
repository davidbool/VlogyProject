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
        this.props.newUser({ name: name, username: username, password: password, DOB: DOB })

        console.log(`name:${name} ,birthday: ${DOB} ,password: ${password} ,username: ${username}`)
    }


    notfilled = () => {
        alert('please fill in the whole details.')
    }

    notTheSamePS = () => {
        alert('Not the same passwords. please type again!')
    }

    render() {

        let fname = this.state.fname
        let lname = this.state.lname
        let DOB = this.state.DOB
        let password = this.state.password
        let passwordagain = this.state.passwordagain
        let username = this.state.username

        return (

            <div>
                  <Link to='/'><i  class="fas fa-arrow-circle-left"></i></Link>
               


                <div class="signup">

                    FirstName:<input name="fname" value={this.state.fname} onChange={this.handleInput} type="text" placeholder="" id="username" />
                    LastName:<input name="lname" value={this.state.lname} onChange={this.handleInput} type="text" placeholder="" id="username" />
                    Date of birth:<input value={this.state.DOB} onChange={this.handleDOB} type="date" placeholder="" id="username" />
                    UserName: <input value={this.state.username} onChange={this.handleUserName} type="text" placeholder="" id="username" />
                    Password:  <input value={this.state.password} onChange={this.handlePassword} type="password" placeholder="" id="password" />
                    Type your new password again: <input value={this.state.passwordagain} onChange={this.handlePasswordagain} type="password" placeholder="" id="password" />
                    {fname === '' || lname === '' || DOB === '' || passwordagain === '' || password === '' || username === '' ?
                        <button className="submit" type='submit' onClick={this.notfilled}>  SignUp <i class="fas fa-times"></i></button> :
                        <div> {this.state.password === this.state.passwordagain ?
                            <Link to='/' ><button className="submit" type='submit' onClick={this.signup}>  SignUp <i class="fas fa-check"></i>

                            </button> </Link> :
                            <button onClick={this.notTheSamePS} className="submit" type='submit'>  SignUp <i class="fas fa-times"></i></button>}</div>
                    }



                </div>
            </div>



        )
    }
}

export default Signup

