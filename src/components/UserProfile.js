import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const links = {
    fontSize: '30%',
    paddingLeft: '55.75%',
    fontWeight: 'normal',
    fontFamily: 'Georgia',
}

const background = {
    marginTop: '-.5%',
    paddingBottom: '50%',
    backgroundSize: 'cover',
    backgroundPositin: 'center',
    backgroundImage: 'url("https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/09/12/21/bank-of-england-EPA.jpg")',
}

const profile = {
    color: '#FFFAFA',
    fontSize: '115%',
    fontWeight: 'normal',
    padding: '1% 0% 0% 5%',
    textDecoration: 'underline',
    textShadow: '2px 2px 4px #000000',
}

class UserProfile extends Component{

    render(){
        return (
            <div>
                <h1 style={{ paddingLeft: "2%", fontSize: '300%' }}>    User Profile
                    <span style={links}>
                        <Link style={{ paddingRight: '1%' }} to="/">Home</Link>
                        <Link style={{ paddingRight: '1%' }} to="/login">Login</Link>
                        <Link style={{ paddingRight: '1%' }} to="/debits">Debits</Link>
                        <Link style={{ paddingRight: '1%' }} to="/credits">Credits</Link>
                    </span>
                </h1>

                <div style={background}>
                    <div style={profile}>Username: {this.props.userName}</div>
                    <div style={profile}>Member Since: {this.props.memberSince}</div>
                </div>
                
            </div>
        );
    }
}

export default UserProfile;