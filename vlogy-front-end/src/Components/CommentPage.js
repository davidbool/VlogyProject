import React, { Component } from 'react';
import axios from 'axios';

class CommentPage extends Component {
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
                
                <div class="dialogbox">
                    <div class="body">
                        <span class="tip tip-left"></span>
                        <div class="message">
                        {localStorage.getItem("username") === c.user?<span onClick={this.delete}><i class="fas fa-times"></i></span>:null}
                            {localStorage.getItem("username") === c.user?<h6>Me:</h6>:<h6>{c.user}:</h6>}
                            
                            <div >
                                <span>{c.text}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentPage
