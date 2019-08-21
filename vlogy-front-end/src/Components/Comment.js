import React, { Component } from 'react'

class Comment extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
            box: []
        }

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



    render() {

        return (
            <div>
                {this.state.box.map(c => <span> <div>{c}</div> </span>)}
                <input type='text' value={this.state.comment} onChange={this.post} placeholder='comment' />
                <button onClick={this.comment}>post</button>

            </div>
        )
    }
}

export default Comment