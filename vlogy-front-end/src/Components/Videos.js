import React, { Component } from 'react'
import axios from 'axios'
import Comment from './Comment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Videos extends Component {
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


                {/* 
<div className='feed'>
                    <h1 id="header" class="text-primary">Vlogy Feed</h1>

                    <div class="container list-article">
                        <div class="btn-group pull-right" id="switch-view">
                            <button class="btn btn-primary">
                                <span class="icon-th-large"></span>
                            </button>
                            <button class="btn btn-primary active">
                                <span class="icon-th-list"></span>
                            </button>
                        </div>
                        <div class="clearfix"></div>
                        <div class="row">
                            <div class="col-xs-12 article-wrapper">
                                <article>
                                    <a href="#" class="more">more</a>
                                    <div class="img-wrapper"><img src="http://lorempixel.com/150/150/fashion" alt="" /></div>
                                    <h1>Lorem ipsum dolor.</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ducimus totam quasi nam porro sed.</p>
                                </article>
                            </div>
                            <div class="col-xs-12 article-wrapper">
                                <article>
                                    <a href="#" class="more">more</a>
                                    <div class="img-wrapper"><img src="http://lorempixel.com/150/150/city" alt="" /></div>
                                    <h1>Dignissimos perferendis quae.</h1>
                                    <p>Numquam dolorem sed quae placeat iusto! Quibusdam doloremque enim assumenda aliquam impedit earum alias labore.</p>
                                </article>
                            </div>
                            <div class="col-xs-12 article-wrapper">
                                <article>
                                    <a href="#" class="more">more</a>
                                    <div class="img-wrapper"><img src="http://lorempixel.com/150/150/food" alt="" /></div>
                                    <h1>Quisquam deserunt cumque!</h1>
                                    <p>Dolor tempora nihil facere explicabo qui mollitia deleniti quam quia iure nisi voluptate voluptatibus cum.</p>
                                </article>
                            </div>
                            <div class="col-xs-12 article-wrapper">
                                <article>
                                    <a href="#" class="more">more</a>
                                    <div class="img-wrapper"><img src="http://lorempixel.com/150/150/nature" alt="" /></div>
                                    <h1>Velit natus possimus.</h1>
                                    <p>Illum voluptates nisi asperiores temporibus illo maiores qui aliquid corporis exercitationem libero dolor tenetur. Doloremque!</p>
                                </article>
                            </div>
                            <div class="col-xs-12 article-wrapper">
                                <article>
                                    <a href="#" class="more">more</a>
                                    <div class="img-wrapper"><img src="http://lorempixel.com/150/150/abstract" alt="" /></div>
                                    <h1>Atque quo maxime.</h1>
                                    <p>Sed eveniet iste magni possimus ipsum dolore ea nesciunt eligendi id. Eum quos voluptatibus ullam.</p>
                                </article>
                            </div>
                        </div>
                    </div>

                





            </div> */}




                <a href='/' > <div onClick={this.exit} className="logOut"><i class="fas fa-walking"></i>
                    <i class="fas fa-door-open"></i>

                </div></a>
                <div className='video-cont'>



                    {this.props.data.map(d =>
                        <div>
                            <video className="videos" width="300" height="200" controls>
                                <source src={`http://localhost:5000/video/${d}`} />
                            </video>
                            <Comment />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Videos