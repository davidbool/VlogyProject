import React, { Component } from 'react'
class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            box: this.props.c
        }

    }

    post = (event) => {
        this.setState({ comment: event.target.value })
    }

    comment = () => {
        let data = {
            name: this.props.d.user,
            filename: this.props.d.id,
            comment: this.state.comment
        }
        console.log(data)
        this.props.comment(data)
        // let newBox = [...this.state.box]
        // newBox.push(this.state.comment)
        // this.setState({
        //     box: newBox
        // })
    }
    delete = () => {
        this.state.box.splice(0,1)

    }

    render() {

        return (
            <div>
                {this.state.box.map(c => <span> <div>{c}</div> <button onClick={this.state}>x</button> </span>)}
                <input type='text' value={this.state.comment} onChange={this.post} placeholder='comment' />
                <button onClick={this.comment}>post</button>

            </div>
        )
    }
}

export default Comment