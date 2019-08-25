import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Comment from './Comment';
import axios from 'axios';

class VideoUserP extends Component {
    constructor() {
        super()
        this.state = {
            like: 0,
            likes: false,
            timeclick: 0,
            comment : ""
        }
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


    like = () =>{
        let vid = this.props.d
        let data ={
            username: localStorage.getItem("username"),
            videoId: vid.videoId,
            uploader: this.props.username
        }
        this.props.likeVid(data)
    }
    handleInput = (e) =>{
        this.setState({
            comment: e.target.value
        })
    }
    
    commentfunction = () =>{
        let data ={
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
        return (
            <div >
                <div>

                    <div className="card4">
                        <div onClick={this.like} className="container">
                            <i class="fas fa-heart"></i>
                            {this.state.likes ? this.props.d.likes.num : this.props.d.likes.num}
                        </div>

                    </div>
                    <video className="videoss" width="400" height="300" controls>
                        <source src={`http://localhost:5000/video/${this.props.d.videoId}`} />
                    </video>
                    <div className="commentcontainer">
                    <input className="commentsss" type='text' value={this.state.comment} onChange={this.handleInput} placeholder='comment' />
                    <span onClick={this.commentfunction}><i class="fas fa-paper-plane"></i></span>
                </div>
                    {this.props.d.comments.map(c => <Comment deleteComment ={this.props.deleteComment} comment ={c} user={this.props.username} vidId ={this.props.d.videoId} />)}
                </div>
            </div>

        )
    }
}

export default VideoUserP

