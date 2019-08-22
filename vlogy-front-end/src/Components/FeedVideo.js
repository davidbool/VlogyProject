import React, { Component } from 'react'
import axios from 'axios'
import FeedComment from './FeedComment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Videos extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
        }
    }

    handleInput = (event) => {
        this.setState({ comment: event.target.value })

    }
    commentfunction = () =>{
        let data ={
            username: this.props.vid.user.username,
            videoId: this.props.vid.id,
            comment: this.state.comment
        }
        this.props.comment(data)
        this.setState({
            comment: ""
        })
    }
    like = () =>{
        let vid = this.props.vid
        let data ={
            username: vid.user.username,
            videoId: vid.id,
            prop: 'likes',
            data: vid.likes +1
        }
        this.props.likeVid(data)
    }

    render() {
        let vid = this.props.vid
       let UserData = this.props.user
        return (

            <div className='video-cont'>
                    <div>
                        <h3>{vid.user.name}</h3>
                        <video className="videoss" width="400" height="300" controls>
                            <source src={`http://localhost:5000/video/${vid.id}`} />
                        </video>
                        <div><span onClick={this.like}><i class="fas fa-heart"></i></span>{vid.likes}</div>
                        <div>
                        {vid.comments.map(c => <FeedComment c={c} vid ={vid} deleteComment={this.props.deleteComment}/> )}
             <input className="comments" type='text' value={this.state.comment} onChange={this.handleInput} placeholder='comment' />
                <button onClick={this.commentfunction}>post</button>
                        </div>
                    </div>
            </div>

        )
    }
}

export default Videos
{/* 
<div className='feed'>
    <h1 id="header" class="text-primary">Vlogy Feed</h1>

    <div class="container list-article">
        <div class="btn-group pull-right" id="switch-view">
            <button class="btn btn-primary">
                <span class="icon-th-large"></span>
            </button>
            <button class="btn btn-primary active">
                <span class="icon-th-list"></span>
            </button>
        </div>
        <div class="clearfix"></div>
        <div class="row">
            <div class="col-xs-12 article-wrapper">
                <article>
                    <a href="#" class="more">more</a>
                    <div class="img-wrapper"><img src="http://lorempixel.com/150/150/fashion" alt="" /></div>
                    <h1>Lorem ipsum dolor.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ducimus totam quasi nam porro sed.</p>
                </article>
            </div>
            <div class="col-xs-12 article-wrapper">
                <article>
                    <a href="#" class="more">more</a>
                    <div class="img-wrapper"><img src="http://lorempixel.com/150/150/city" alt="" /></div>
                    <h1>Dignissimos perferendis quae.</h1>
                    <p>Numquam dolorem sed quae placeat iusto! Quibusdam doloremque enim assumenda aliquam impedit earum alias labore.</p>
                </article>
            </div>
            <div class="col-xs-12 article-wrapper">
                <article>
                    <a href="#" class="more">more</a>
                    <div class="img-wrapper"><img src="http://lorempixel.com/150/150/food" alt="" /></div>
                    <h1>Quisquam deserunt cumque!</h1>
                    <p>Dolor tempora nihil facere explicabo qui mollitia deleniti quam quia iure nisi voluptate voluptatibus cum.</p>
                </article>
            </div>
            <div class="col-xs-12 article-wrapper">
                <article>
                    <a href="#" class="more">more</a>
                    <div class="img-wrapper"><img src="http://lorempixel.com/150/150/nature" alt="" /></div>
                    <h1>Velit natus possimus.</h1>
                    <p>Illum voluptates nisi asperiores temporibus illo maiores qui aliquid corporis exercitationem libero dolor tenetur. Doloremque!</p>
                </article>
            </div>
            <div class="col-xs-12 article-wrapper">
                <article>
                    <a href="#" class="more">more</a>
                    <div class="img-wrapper"><img src="http://lorempixel.com/150/150/abstract" alt="" /></div>
                    <h1>Atque quo maxime.</h1>
                    <p>Sed eveniet iste magni possimus ipsum dolore ea nesciunt eligendi id. Eum quos voluptatibus ullam.</p>
                </article>
            </div>
        </div>
    </div>







</div> */}