import React, { Component } from 'react';
import axios from 'axios';

class Comment extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
        }

    }

    commentfunction = async () => {
        this.comment()
        await this.props.comment({ username: localStorage.getItem("username"), videoId: this.props.d.id, comments: this.state.box })
    }

    post = (event) => {
        this.setState({ comment: event.target.value })
    }

    comment = () => {
        let newBox = [...this.state.box]
        newBox.push(this.state.comment)
        this.setState({
            box: newBox
        })
    }
    delete = () =>{
        let data ={
            username: this.props.user,
            videoId: this.props.vidId,
            comment: this.props.comment.text
        }
        this.props.deleteComment(data)    
    }



    render() {
        // console.log(this.state.box.sort(function(a,b){return b-a}))
        let c = this.props.comment
        return (
            <div>
                 <h6>{c.user}:</h6>
                                <div class="message">
                                    <span>{c.text}</span>
                                </div>
                                <span onClick={this.delete}>X</span>



                {/* <div className="commentcontainer">
                    <input className="commentsss" type='text' value={this.state.comment} onChange={this.post} placeholder='comment' />
                    <span onClick={this.commentfunction}><i class="fas fa-paper-plane"></i></span>
                </div> */}

                {/* <div className="card2">
                    <div className="container">
                        <i class="fas fa-heart"></i>
                        {c === undefined ? null : <span>  <div class="dialogbox">
                            <div class="body">
                                <span class="tip tip-left"></span>

                                <div onClick={this.delete}><i class="fas fa-trash-alt"></i></div>
                                <h6>{c.user}:</h6>
                                <div class="message">
                                    <span>{c.text}</span>
                                </div>

                            </div>

                        </div>  </span>
                        }



                    </div>

                </div> */}


            </div>
        )
    }
}

export default Comment
