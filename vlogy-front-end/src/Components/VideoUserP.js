import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class VideoUserP extends Component {
    constructor() {
        super()
        this.state = {
            like: 0,
            likes: false
        }
    }



    likes = () => {
        this.setState({
            likes: true,
            like: this.props.d.likes + 1
        }, function () {
            this.updatelikes()
        })

    }


    updatelikes = () => {
        let datas = this.props.updateUserVideo({ data: this.state.like, prop: 'likes', username: this.props.username, videoId: this.props.d.videoId })
        console.log(datas)
    }



    render() {
        console.log(this.props.d)
        console.log(this.props.username)
        return (
            <div >
                <div>
                    <div className="card3">
                        <div className="container">

                        </div>
                    </div>
                    <div className="card4">
                        <div onClick={this.likes} className="container">
                            <i class="fas fa-heart"></i>
                            {this.state.likes ? this.props.d.likes + 1 : this.props.d.likes}

                        </div>
                    </div>
                    <video className="videoss" width="400" height="300" controls>
                        <source src={`http://localhost:5000/video/${this.props.d.videoId}`} />

                    </video>

                </div>
            </div>

        )
    }
}

export default VideoUserP

