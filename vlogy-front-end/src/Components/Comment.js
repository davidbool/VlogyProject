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



    commentfunction = async () =>{
        this.comment()
       await this.props.comment({username:localStorage.getItem("username"), videoId:this.props.d.id,  comments:this.state.box})
       
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
        console.log(this.props.d)

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

                <input className="comments" type='text' value={this.state.comment} onChange={this.post} placeholder='comment' />
                <button onClick={this.commentfunction}>post</button>

            </div>
        )
    }
}

export default Comment
