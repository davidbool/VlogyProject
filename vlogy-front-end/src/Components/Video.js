import React, { Component } from "react";
import Comments from "./Comment";

class Video extends Component {
  deleteVideo = () => {
      let vidId =  this.props.d.id
    this.props.delete(vidId);
  };
  render() {
    let d = this.props.d;
    return (
      <div>
        <div onClick={this.deleteVideo}>X</div>
        <video className="videoss" width="400" height="300" controls>
          <source src={`http://localhost:5000/video/${d}`} />
        </video>
        <Comments c={d.comments} d={d} comment={this.props.comment} />
      </div>
    );
  }
}

export default Video;
