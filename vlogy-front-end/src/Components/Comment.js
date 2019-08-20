import React, { Component } from 'react'

class Comment extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
        }

    }

    post = (event) => {
        this.setState({ comment: event.target.value })


    }

    render() {
        return (
            <div>
                <input type='text' value={this.state.comment} onChange={this.post} placeholder='comment' />

                <button onClick={console.log(this.state.comment)}>post</button>

            </div>
        )
    }
}

export default Comment