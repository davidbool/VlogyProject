import React, { Component } from 'react'
import App from '../App'
import axios from 'axios'
import FeedVideo from './FeedVideo'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Draggable, { DraggableCore } from 'react-draggable';
import GridFeed from './GridFeed';
import InfiniteScroll from 'react-infinite-scroller';



class Feed extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    getFeed = async () => {
        let videos = await axios.get('http://localhost:5000/feed')
        let feed = videos.data.filter(o => o.user.username !== localStorage.getItem("username"))
        console.log(feed)
        this.setState({ data: feed })

    }
    componentDidMount = async () => {
        this.getFeed()
    }

    render() {

        return (
            <div>
                <div className='feed'>
                    <span className="myfeed">Feed</span>
                    <div className="grid"> <a href='/feed' ><i class="fas fa-th-large"></i></a></div>

                </div>
                {/* <InfiniteScroll
                    pageStart={2}
                    loadMore= {this.state.data.map(v => <GridFeed deleteComment={this.deleteComment} likeVid={this.likeVid} vid={v} UserData={this.state.UserData} date={v.user.uploads[0].date[0]} comment={this.comment} />)}
                    hasMore={true || false}
                    loader={<div className="loader" key={3}>Loading ...</div>}
                >
                    {this.state.data.map(v => <GridFeed deleteComment={this.deleteComment} likeVid={this.likeVid} vid={v} UserData={this.state.UserData} date={v.user.uploads[0].date[0]} comment={this.comment} />)}
                </InfiniteScroll> */}
                {this.state.data.map(v => <GridFeed deleteComment={this.deleteComment} likeVid={this.likeVid} vid={v} UserData={this.state.UserData} date={v.user.uploads[0].date[0]} comment={this.comment} />)}
            </div>

        )
    }

}
export default Feed;
