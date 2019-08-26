import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CommentPage from './CommentPage';
import axios from 'axios';

class VideoUserP extends Component {
    constructor() {
        super()
        this.state = {
            like: 0,
            likes: false,
            timeclick: 0,
            comment: "",
            showcomments: false,
        }
    }

    showcomments = () => {
        this.setState({
            showcomments: !this.state.showcomments
        })

    }


    postLike = () => {
        if (this.state.like == 0) {

            this.setState({
                likes: true,
                like: this.props.d.likes + 1,


            }, function () {
                this.updatelikes()
            })
        }
        else if (this.state.like < 2) {
            this.setState({
                like: this.props.d.like == 0
            })
        }
        else if (this.state.like > 1) {
            this.setState({
                likes: true,
                like: this.props.d.likes - 1,


            }, function () {
                this.updatelikes()
            })
        }

    }
    updateUserVideo = (data) => {
        axios.put('http://localhost:5000/like', data)
        //   .then( (response) => {
        //     this.myData()
        //   })
    }


    like = () => {
        let vid = this.props.d
        let data = {
            username: localStorage.getItem("username"),
            videoId: vid.videoId,
            uploader: this.props.username
        }
        this.props.likeVid(data)
    }
    handleInput = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    commentfunction = () => {
        let data = {
            username: localStorage.getItem("username"),
            videoId: this.props.d.videoId,
            comment: this.state.comment,
            uploader: this.props.username
        }
        this.props.comment(data)
        this.setState({
            comment: ""
        })

    }


    render() {
        let d = this.props.d;
        return (

            <div >


                <div class="card7">

                    <div className="container" >
                        <video className="videoss" width="400" height="300" controls>
                            <source src={`http://localhost:5000/video/${this.props.d.videoId}`} />
                        </video>
      
                        <div>
                         <i onClick={this.showcomments} class="far fa-comment-dots"></i>
                         <i id="mylikes" onClick={this.like} class="fab fa-gratipay"></i><span className="numlikes">{d.likes.num}</span>
                        </div>
                        {this.state.showcomments ? <div><div class="dialogbox7">

                            {this.props.d.comments.map(c => <CommentPage deleteComment={this.props.deleteComment} comment={c} user={this.props.username} vidId={this.props.d.videoId} />)}


                        </div>  <span><input className="commentsss8" type='text' value={this.state.comment} onChange={this.handleInput} placeholder='comment' /> <span onClick={this.commentfunction}><i class="fas fa-plus"></i>

                        </span></span></div> : null}

                    </div>
                </div>
            </div>



        )
    }
}

export default VideoUserP

