import React, { Component } from 'react';
import axios from 'axios';

class Comment extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
            box: [],

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
        this.state.box.splice(0, 1)

    }



    render() {
        // console.log(this.state.box.sort(function(a,b){return b-a}))
        console.log(this.props.c)
        console.log(this.props.userdata)

        return (
            <div>


                {/* {this.props.d.comments.map(c => c === ''? null: <span>  <div class="dialogbox">
                    <div class="body">
                        <span class="tip tip-left"></span>
                        <div>{localStorage.getItem("username")}</div>
                        <div onClick={this.delete}><i class="fas fa-trash-alt"></i></div>
                        <div class="message">
                            <span>{c}</span>
                        </div>

                    </div>

                </div>  </span>)} */}
                <div className="commentcontainer">
                    <input className="commentsss" type='text' value={this.state.comment} onChange={this.post} placeholder='comment' />
                    <span onClick={this.commentfunction}><i class="fas fa-paper-plane"></i></span>
                </div>

                <div className="card2">
                    <div className="container">
                    <i class="fas fa-heart"></i> 
                    </div>

                </div>


            </div>
        )
    }
}

export default Comment
