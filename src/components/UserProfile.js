import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const links = {
    float: 'right',
    paddingRight: '3%',
    fontSize: '30%',
    fontWeight: 'normal',
    fontFamily: 'Georgia'
}

const name = {
    paddingLeft: "2%",
    fontSize: '300%',
}

const background = {
    backgroundImage: 'url("https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/09/12/21/bank-of-england-EPA.jpg")',
    backgroundSize: 'cover',
    backgroundPositin: 'center',
    paddingBottom: '50%',
    marginTop: '-.5%',
}

const heading = {
    color: '#FFFAFA',
    textShadow: '2px 2px 4px #000000',
    textDecoration: 'underline',
    fontSize: '100%',
    fontWeight: 'normal',
    paddingLeft: '5%',
    paddingTop:'1%'
}

class UserProfile extends Component{

    render(){
        return (
            <div>
                <h1 style={name}>User Profile
                    <span style={links}>
                        <Link to="/">Home</Link>
                    </span>
                </h1>

                <div style={background}>
                    <div style={heading}>Username: {this.props.userName}</div>
                    <div style={heading}>Member Since: {this.props.memberSince}</div>
                </div>
                
            </div>
        );
    }
}

export default UserProfile;