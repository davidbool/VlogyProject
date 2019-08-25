import React, { Component } from "react";
import Comments from "./Comment";

class Video extends Component {
  constructor(){
    super()
    this.state ={
      comment: ''
    }
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
        uploader: this.props.userdata.username
    }
    this.props.comment(data)
    this.setState({
        comment: ""
    })
}
  like = () =>{
    let data ={
        username: localStorage.getItem("username"),
        videoId: this.props.d.videoId,
        uploader: this.props.userdata.username
    }
    this.props.likeVid(data)
}
  render() {
    
    let d = this.props.d;
    return (
      <div>
        <video className="videoss" width="400" height="300" controls>
          <source src={`http://localhost:5000/video/${d.videoId}`} />
        </video>
        {d.comments.map(c => <Comments deleteComment={this.props.deleteComment} user={this.props.userdata.username} comment={c} vidId ={this.props.d.videoId} />)}
        <input className="commentsss" type='text' value={this.state.comment} onChange={this.handleInput} placeholder='comment' />
                <span onClick={this.commentfunction}><i class="fas fa-paper-plane"></i></span>
        <div><span onClick={this.like}><i class="fas fa-heart"></i></span>{d.likes.num}</div>
        
      </div>
    );
  }
}

export default Video;
