import React, { Component } from 'react'
import axios from 'axios'
import Comment from './Comment' 
class Videos extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            comment: '',
        }

    }


    getFeed = async () => {
        let filname = await axios.get('http://localhost:5000/files')
        console.log(filname)
        return filname.data.map(d => d.filename)

    }

    componentDidMount = async () => {
        let data = await this.getFeed()
        this.setState({ data })

    }

    post = (event) => {
        this.setState({ comment: event.target.value })


    }


    render() {

        return (
            <div className='video-cont'>
                {this.state.data.map(d =>
                    <div>
                        <Comment />

                        <video width="320" height="240" controls>
                            <source src={`http://localhost:5000/video/${d}`} />
                        </video>
                    </div>
                )}
            </div>
        )
    }
}

export default Videos