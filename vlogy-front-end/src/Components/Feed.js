import React, { Component } from 'react'
import App from '../App'
import axios from 'axios'
import FeedVideo from './FeedVideo'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class Feed extends Component {
    constructor() {
        super()
        this.state = {
            file: React.createRef(),
            data: [],
            UserData: {},
            showupload: false
        }
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
                this.getFeed()
                this.setState({
                    showupload: false,
                    file: React.createRef()
                })

            })
        })
    }

    exit = () => {
        alert(`${localStorage.getItem("username")} you are Loging-Out`)
        localStorage.clear()
    }


    showupload =() =>{
        this.setState({
            showupload : !this.state.showupload
        })
    }

    getFeed = async () => {
        let videos = await axios.get('http://localhost:5000/feed')
        this.setState({ data : videos.data })
    
    }
    componentDidMount = async () => {
        this.getFeed()
    }
  
    handleinput = (e) => {
        this.setState({ file: e.target.value })
    }

    
    comment = (data) =>{
        axios.put('http://localhost:5000/addComment', data)
          .then( (response) => {
            console.log(response)
            this.getFeed()
          })
    }
    deleteComment = (data) =>{
        console.log(data)
        axios({
            method: 'delete',
            url: 'http://localhost:5000/comment',
            data: data
            }).then((response) => {
            this.getFeed()
            })
        }
    likeVid = (data) =>{
        axios.put('http://localhost:5000/updateUser/video', data)
      .then( (response) => {
        this.getFeed()
      })
    }
    render() {
        return (
            <Router>
                <div className='feed'>

                 <a href='/' >
     <div onClick={this.exit} className="logOut"><i class="fas fa-walking"></i>
                            <i class="fas fa-door-open"></i>
                        </div>
                   </a>

                    <div className='input'>


                    {this.state.showupload ?
                            <div><div onClick={this.showupload} ><li class="fas fa-video"></li></div>
                                <div className="uploadcontainer">
                                    <input className="inputupload" type='file' ref={this.state.file} />
                                    <button className="uploadbutton" onClick={this.handleUploadFile} >upload</button>
                                </div> </div> :
                            <div onClick={this.showupload} ><li class="fas fa-video"></li></div>}
                        <div>
                        {this.state.data.map(v => <FeedVideo deleteComment ={this.deleteComment} likeVid ={this.likeVid} vid ={v} UserData={this.state.UserData} comment = {this.comment} />)}
                        </div>

                    </div>

                </div> 

            </Router>
        )
    }

}
export default Feed;
