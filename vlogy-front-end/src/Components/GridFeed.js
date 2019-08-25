import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import FeedComment from './FeedComment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Draggable, { DraggableCore } from 'react-draggable';
import Feedsecond from './Feedsecond'

class GridFeed extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
        }
    }

    handleInput = (event) => {
        this.setState({ comment: event.target.value })

    }
    commentfunction = () => {
        let data = {
            username: this.props.vid.user.username,
            videoId: this.props.vid.id,
            comment: this.state.comment
        }
        this.props.comment(data)
        this.setState({
            comment: ""
        })
    }
    like = () => {
        let vid = this.props.vid
        let data = {
            username: vid.user.username,
            videoId: vid.id,
            prop: 'likes',
            data: vid.likes + 1
        }
        this.props.likeVid(data)
    }

    render() {

        let vid = this.props.vid
        let touser = `/user/${vid.user.username}`
        let UserData = this.props.user
        return (


            <div className='video-cont4'>
                { <a href={touser}>
                    <video className="videossss4" width="450" height="350" controls>

                        <source src={`http://localhost:5000/video/${vid.id}`} />
                    </video>
                </a> }


            </div>


        )
    }
}

export default GridFeed
