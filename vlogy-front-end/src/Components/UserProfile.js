import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import feed from './Feed'
import Login from './Login';
import Video from './Video'

class UserProfile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            about: '',
            showlogout: false,
            UserData: {uploads : []},
            img: '',
            editimg: false,
            editingtwo: false,
            file: React.createRef(),
            showupload: false,
            edit:false
        }
    }

    edit=()=>{
        this.setState({
            edit:!this.state.edit
        })
    }

    updateUser = () => {
        let datas = this.props.updateUser({ data: this.state.img, prop: 'profilePic', username: localStorage.getItem("username") })
        console.log(datas)
    }

    updateabout = () => {
        let datas = this.props.updateUser({ data: this.state.about, prop: 'about', username: localStorage.getItem("username") })
        console.log(datas)
    }


    handleeditimg = () => {
        this.setState({
            img: '',
            editimg: !this.state.editimg,
        })
    }

    handleeditimgtwo = () => {
        this.setState({
            editingtwo: !this.state.editingtwo,
        })
    }

    showupload = () => {
        this.setState({
            showupload: !this.state.showupload,
        })
    }

    handleUserName = (u) => {
        let username = u.target.value
        this.setState({
            username
        })
    }

    handleimg = (u) => {
        let img = u.target.value
        this.setState({
            img
        }, function () {
            this.updateUser()
        })
    }

    handleshow = () => {
        this.setState({
            showlogout: !this.state.showlogout
        })
    }

    handlePassword = (p) => {
        let password = p.target.value
        this.setState({
            password
        })
    }

    UserExict = async () => {
        let UserData = await this.props.UserExict({ username: this.state.username, password: this.state.password })
        console.log('hello')
        console.log(UserData)
    }

    handleAbout = (v) => {
        let about = v.target.value
        this.setState({
            about
        }, function () {
            this.updateabout()
        })

    }
    
    exit = () => {
        alert(`${localStorage.getItem("username")} you are Loging-Out`)
        localStorage.clear()
        this.deleteuser()
    }

    getUser = async () => {
        let username = localStorage.getItem('username')
        let password = localStorage.getItem('password')
        let user = await axios.get(`http://localhost:5000/username/${username}/password/${password}`)
        this.setState({ UserData: user.data[0] })
    }

    deleteVideo = (videoId) => {
        let username = localStorage.getItem("username")
        axios({
            method: 'delete',
            url: `http://localhost:5000/files/${videoId}/${username}`,
        }).then((response) => {
            console.log(response)
            this.getUser()

        })
    }

    componentDidMount = () => {
        this.getUser()
    }

    handleUploadFile = () => {
        const data = new FormData();
        let username = localStorage.getItem("username")
        data.append('file', this.state.file.current.files[0]);
        axios.post('http://localhost:5000/upload', data).then((response) => {
            axios({
                method: 'put',
                url: 'http://localhost:5000/uploadVideo',
                data: {
                    filename: response.data,
                    username: username
                }
            }).then((response) => {
                this.setState({
                    file: React.createRef(),
                    showupload: false
                })
                this.getUser()
            })
        })
    }

    deleteuser = () => {
        localStorage.username = { 'username': localStorage.getItem("username") };
        localStorage.username = undefined
    }
    likeVid = (data) =>{
        axios.put('http://localhost:5000/like', data)
      .then( (response) => {
        this.getUser()
      })
    }
    comment = (data) => {
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


    render() {
        // console.log(this.props.allData.filter(u => u.username == localStorage.getItem("username")).map(r => r.about))
        let userPic = this.props.allData.filter(u => u.username == localStorage.getItem("username")).map(p => p.profilePic)
        // console.log(this.props.allData.filter(u => u.username == localStorage.getItem("username")).map(p => p.following)[0])
        return (

            < Router >
                <div className='userprofile'>

                    <div>

                        {this.props.allData.filter(u => u.username == localStorage.getItem("username")).map(p => p.profilePic)[0] === undefined ?
                            <div><input className="imginput" value={this.state.img} onChange={this.handleimg} placeholder="put image url" /> <div className='usernameprofile'> <i class="fas fa-user-alt"> </i>
                                {localStorage.getItem("username")}</div> </div>
                            :
                            <div className='usernameprofile'> <img className="usernameimg" src={userPic} /> <div onClick={this.handleeditimg} ><i class="fas fa-user-edit"></i></div>  {localStorage.getItem("username")}  </div>}
                        <div>{this.state.editimg ? <input className="imginput" value={this.state.img} onChange={this.handleimg} placeholder="put image url" /> : null}</div>


                        {/* {this.props.allData.filter(u => u.username == localStorage.getItem("username")).map(f => <div className="followersprofile"><div>Following: {f.following} </div><div>Followers: {f.followers}</div></div>)} */}


                        <a href='/' > <div onClick={this.deleteuser} className="logOut"><i class="fas fa-walking"></i>
                            <i class="fas fa-door-open"></i>
                        </div></a>

                        {this.state.showupload ?
                            <div><div onClick={this.showupload} ><li class="fas fa-video"></li></div>
                                <div className="uploadcontainer">
                                    <input className="inputupload" type='file' ref={this.state.file} />
                                    <button className="uploadbutton" onClick={this.handleUploadFile} >upload</button>
                                </div> </div> :
                            <div onClick={this.showupload} ><li class="fas fa-video"></li></div>}

                        <form >
                            <label for="fname">About MySelf</label>
                            {this.props.allData.filter(u => u.username == localStorage.getItem("username")).map(r => r.about) === undefined || this.state.editingtwo ? <input value={this.props.UserData.about} onChange={this.handleAbout} type="text" className="aboutmyself" name="fname" /> :
                            <div type="text" className="aboutmyself" name="fname">{this.props.allData.filter(u => u.username == localStorage.getItem("username")).map(r => r.about)}<span> {this.state.edit?<i onClick={this.handleeditimgtwo} className="fas fa-pencil-alt"></i>:null} </span></div> }



                        </form>

                        <div>
                       <div onClick={this.edit}><i class="far fa-edit"></i></div> 


                            {this.state.UserData.uploads.map(d =>
                            this.state.edit?
                                <div className="video-container">
                                    <div onClick={this.deleteVideo}><i class="fas fa-trash"></i>
                                    </div>
                                    
                                    <Video likeVid={this.likeVid} userdata={this.state.UserData} d={d} deleteComment={this.deleteComment} comment={this.comment} />
                                    
                                </div>:
                                 <div className="video-container">
                                 <Video likeVid={this.likeVid} userdata={this.state.UserData} d={d} deleteComment={this.deleteComment} comment={this.comment} />
                             </div>
                            
                            )}

                        </div>
                    </div>
                </div>
            </Router >
        );
    }


}
export default UserProfile;
