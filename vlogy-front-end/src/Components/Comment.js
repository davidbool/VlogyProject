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
    delete = () => {
        let data = {
            username: this.props.user,
            videoId: this.props.vidId,
            comment: this.props.comment.text
        }
        this.props.deleteComment(data)
    }



    render() {

        let c = this.props.comment
        return (
            <div>
                
                <div class="dialogbox3">
                    <div class="body3">
                        <span class="tip tip-left"></span>
                        <div class="message3">
                            <span onClick={this.delete}><i class="fas fa-times"></i></span>
                            {localStorage.getItem("username") === c.user?<h6>Me:</h6>:<h6>{c.user}:</h6>}
                            
                            <div class="message">
                                <span>{c.text}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment
