import React, { Component } from 'react';

class FeedComment extends Component {

    delete = () => {
        let data = {
            username: this.props.vid.user.username,
            videoId: this.props.vid.id,
            comment: this.props.c
        }
        // console.log(data)
        this.props.deleteComment(data)
    }
    render() {
        let comment = this.props.c
        return (<div >
            <span>  <div class="dialogbox">

                <div class="body">
                {localStorage.getItem("username") === comment.user ? <span onClick={this.delete}><i class="fas fa-trash"></i></span>:null}
                    <span class="tip tip-left"></span>
                    {localStorage.getItem("username") === comment.user ? <h6>Me:</h6> : <h6>{comment.user}:</h6>}

                    {/* <div onClick={this.delete}><i class="fas fa-trash-alt"></i></div> */}
                    <div class="message">
                        <span>{comment.text}</span>
                    </div>

                </div>

            </div>  </span>
        </div>)
    }
}

export default FeedComment