import React, { Component } from 'react';

class FeedComment extends Component {

    delete = () =>{
        let data ={
            username: this.props.vid.user.username,
            videoId: this.props.vid.id,
            comment:this.props.c
        }
        // console.log(data)
        this.props.deleteComment(data)    
    }
    render(){
        let comment = this.props.c
        return(<div>
            <span onClick = {this.delete}><i class="fas fa-trash"></i></span>{comment}
        </div>)
    }
}

export default FeedComment