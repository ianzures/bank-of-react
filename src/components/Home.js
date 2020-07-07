import React from 'react';
import AccountBalance from './AccountBalance.js';
import { Link } from 'react-router-dom';

const links = {
    fontSize: '30%',
    paddingLeft: '50%',
    fontWeight: 'normal',
    fontFamily: 'Georgia',
}


const background = {
    marginTop: '-.5%',
    paddingBottom: '50%',
    backgroundSize: 'cover',
    backgroundImage: 'url("https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/09/12/21/bank-of-england-EPA.jpg")',
}


class Home extends React.Component{
    render() {
        return (
            <div >
                <h1 style={{ paddingLeft: "2%", fontSize: '300%' }}>    Bank of React
                    <span style={links}>
                        <Link style={{ paddingRight: '1%' }} to="/userProfile">User Profile</Link>
                        <Link style={{ paddingRight: '1%' }} to="/login">Login</Link>
                        <Link style={{ paddingRight: '1%' }} to="/debits">Debits</Link>
                        <Link style={{ paddingRight: '1%' }} to="/credits">Credits</Link>
                    </span>
                </h1>
                <div style={background}>
                    <AccountBalance accountBalance={this.props.accountBalance} />
                </div>
            </div> 
        )
    }
}

export default Home;