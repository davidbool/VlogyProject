import React, { Component } from "react";
import Comment from "./Comment";


class Video extends Component {
  constructor() {
    super()
    this.state = {
      comment: '',
      showcomments: false,

    }
  }
  handleInput = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  showcomments = () => {
    this.setState({
      showcomments: !this.state.showcomments
    })

  }


  commentfunction = () => {
    let data = {
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
  like = () => {
    let data = {
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


        <div class="card7">

          <div className="container">
            <video className="videoss" width="355" height="300" controls>
              <source src={`http://localhost:5000/video/${d.videoId}`} />
            </video>
            <div className="likie">
            <i onClick={this.showcomments} class="far fa-comment-dots"></i>
           <i id="mylikes"  onClick={this.like} class="fab fa-gratipay"></i><span className="malikes">{d.likes.num}</span>
           </div>
            
            {this.state.showcomments ? <div><div class="dialogbox5">

              {d.comments.map(c => <Comment deleteComment={this.props.deleteComment} user={this.props.userdata.username} comment={c} vidId={this.props.d.videoId} />)}

            
            </div>  <span><input className="commentsss7" type='text' value={this.state.comment} onChange={this.handleInput} placeholder='comment' /> <span onClick={this.commentfunction}><i class="fas fa-plus"></i>

            </span></span></div> : null}

          
        </div>
      </div>
      </div>
    );
  }
}

export default Video;

 