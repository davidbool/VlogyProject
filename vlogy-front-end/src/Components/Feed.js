import React, { Component } from 'react'
import App from '../App'
import axios from 'axios'
import Videos from './Videos'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class Feed extends Component {
    constructor() {
        super()
        this.state = {
            file: React.createRef(),
            data: [],
            UserData: {}
        }
    }

    handleUploadFile = () => {
        const data = new FormData();
        let username = this.state.data.username
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
        console.log(localStorage.getItem("username"))

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

    render() {
        return (
            <Router>
                <div className='feed'>
                    <div className='profile-link'>
                        <Link to='/userprofile'>my profile</Link>
                    </div>
                    <button onClick={this.whoConnect}>who Connect </button>

                    <div className='input'>

                        <input type='file' class="fas fa-video" ref={this.state.file} />
                        <button onClick={this.handleUploadFile} >upload</button>
                        <div>

                            <Videos data={this.state.data} UserData={this.state.UserData} />
                        </div>

                    </div>

                </div>

            </Router>
        )
    }

}
export default Feed;
