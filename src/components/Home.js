import React from 'react';
import AccountBalance from './AccountBalance.js';
import { Link } from 'react-router-dom';

const name = {
    paddingLeft: "2%",
    fontSize: '300%',
}

const links = {
    paddingLeft: '50%',
    fontSize: '30%',
    fontWeight: 'normal',
    fontFamily: 'Georgia'
}
const space = {
    paddingRight: '1%',
}

const background = {
    backgroundImage: 'url("https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/09/12/21/bank-of-england-EPA.jpg")',
    backgroundSize: 'cover',
    backgroundPositin: 'center',
    paddingBottom: '50%',
    marginTop: '-.5%',
}


class Home extends React.Component{
    render() {
        return (
            <div >
                <h1 style={name}>    Bank of React
                    <span style={links}>
                        <Link style={space} to="/userProfile">User Profile</Link>
                        <Link style={space} to="/login">Login</Link>
                        <Link style={space} to="/debits">Debits</Link>
                        <Link style={space} to="/credits">Credits</Link>
                    </span>
                </h1>
                <div style={background}>
                    <AccountBalance accountBalance={this.props.accountBalance.toFixed(2)} />
                </div>
            </div> 
        )
    }
}

export default Home;