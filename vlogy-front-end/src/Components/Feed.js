import React, { Component } from 'react'
import App from '../App'
import axios from 'axios'
import FeedVideo from './FeedVideo'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Draggable, { DraggableCore } from 'react-draggable';
import GridFeed from './GridFeed'
import Feedsecond from './Feedsecond';



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


    showupload = () => {
        this.setState({
            showupload: !this.state.showupload
        })
    }

    getFeed = async () => {
        let videos = await axios.get('http://localhost:5000/feed')
        let feed = videos.data.filter(o => o.user.username !== localStorage.getItem("username"))
        this.setState({ data: feed })
    }

    componentDidMount = async () => {
        this.getFeed()
    }

    handleinput = (e) => {
        this.setState({ file: e.target.value })
    }


    comment = (data) => {
        console.log(data)
        axios.put('http://localhost:5000/addComment', data)
            .then((response) => {
                console.log(response)
                this.getFeed()
            })
    }

    deleteComment = (data) => {
        axios({
            method: 'delete',
            url: 'http://localhost:5000/comment',
            data: data
        }).then((response) => {
            this.getFeed()
        })
    }

    likeVid = (data) => {
        axios.put('http://localhost:5000/like', data)
            .then((response) => {
                this.getFeed()
            })
    }


    scrolltop=()=>{
        window.scrollTo(0, 0)
    }

    render() {
        console.log(this.state.data)
        let scroll=this.scrolltop
        return (
            <Router>
                <div className='feed'>
                   
                    <span className="myfeed">Feed</span>
                    {/* <Route path="/gridfeed" exact render={() => this.state.data.map(v =><GridFeed  deleteComment ={this.deleteComment} likeVid ={this.likeVid} vid ={v} UserData={this.state.UserData} date={v.user.uploads[0].date[0]} comment = {this.comment}  />)} /> */}

                    <div className="grid"> <a href='/gridfeed' ><i class="fas fa-th-large"></i></a></div>

                    <a href='/' >
                        <div onClick={this.exit} className="logOut"><i class="fas fa-walking"></i>
                            <i class="fas fa-door-open"></i>
                        </div>
                    </a>

                    <div className='input'>

                    <div className="scrolltop" onClick={scroll} ><i class="fas fa-angle-double-up"></i></div>


                        {this.state.showupload ?
                            <div><div onClick={this.showupload} >  <li class="fas fa-video"></li></div>

                                <Draggable>
                                    <div className="uploadcontainer2">
                                        <input className="inputupload" type='file' ref={this.state.file} />
                                        <button className="uploadbutton" onClick={this.handleUploadFile} >upload</button>
                                    </div></Draggable> </div> :
                            <div onClick={this.showupload} ><li class="fas fa-video"></li></div>}
                        <div>
                            {this.state.data.map(v => <FeedVideo users={v.likes.users} deleteComment={this.deleteComment} likeVid={this.likeVid} vid={v} UserData={this.state.UserData} date={v.user.uploads[0].date[0]} comment={this.comment} />)}
                        </div>

                    </div>

                </div>

            </Router>
        )
    }

}
export default Feed;
