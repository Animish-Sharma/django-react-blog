import React from 'react';
import {Link} from 'react-router-dom';
function Home() {
    return (
        <div className="container">
            <div className="jumbotron mt-5">
                <h1 className="display-4">Welcome to Blogger Man</h1>
                <p className="lead">We make awesome blogs about all kinds of topics</p>
                <hr className="my-4"/>
                <p>Click The Button below to check out our Awesome blog</p>
                <Link className="btn btn-primary btn-lg" to="/blog" role="button">Check out our Blog</Link>
            </div>
        </div>
        
    )
}

export default Home
