import React, { Component } from 'react'
import App from '../App'
import axios from 'axios'
import Videos from './Videos'
class Feed extends Component {
    constructor() {
        super()
        this.state = {
            file: React.createRef(),
            data: []
        }
    }

    handleUploadFile = () => {
        const data = new FormData();
        let username = this.props.data.username
        data.append('file', this.state.file.current.files[0]);
        axios.post('http://localhost:5000/upload', data).then((response) => {
            axios({
                method: 'put',
                url: 'http://localhost:5000/uploadVideo',
                data: {
                    filename: response.data,
                    username: username
                }
            });
        })
    }

  
    handleinput = (e) => {
        this.setState({ file: e.target.value })
    }

    whoConnect = () => {
        console.log(this.props.data.username)
    }
    
    
    render() {
        return (
            <div className='feed'>
                <button onClick={this.whoConnect}>who Connect </button>

                <div className='input'>

                    <input type='file' class="fas fa-video" ref={this.state.file} /> 
                    {/* <input type='file' ref={this.state.file}></input> */}
                    <button onClick={this.handleUploadFile} >upload</button>             
                      <div>
                        <Videos data ={this.props.data} UserData={this.props.UserData} />
                      </div>

                </div>

            </div>

        )
    }

}
export default Feed;
