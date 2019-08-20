import React, { Component } from 'react'
import App from '../App'
import axios from 'axios'
import Videos from './Videos'
class Feed extends Component {
    constructor() {
        super()
        this.state = {
            file: React.createRef()
        }
    }

    handleUploadFile = () => {
        const data = new FormData();
        data.append('file', this.state.file.current.files[0]);
        axios.post('http://localhost:5000/upload', data).then(function (response) {
            axios({
                method: 'put',
                url: 'http://localhost:5000/updateUser',
                data: {
                  filename: response.data,
                  username: "String"
                }
              });
          })
        console.log(this.state.file)
    }
    handleinput = (e) => {
        this.setState({ file: e.target.value })

    }

    render() {
        return (
            <div className='feed'>
                <div className='input'>
                    <input type='file' ref={this.state.file}></input>
                    <button onClick={this.handleUploadFile} >upload</button>
                    <div>
                        <Videos />
                        
                    </div>


                </div>
            </div>
        )
    }

}
export default Feed;