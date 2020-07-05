import React from 'react';
import AccountBalance from './AccountBalance.js';
import { Link } from 'react-router-dom';

const test = {
    paddingLeft : "50%"
}

class Home extends React.Component{
    render() {
        return (
            <div>
                <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/09/12/21/bank-of-england-EPA.jpg" alt="bank" />
                <h1 style={test}>Bank of React</h1>

                <Link to="/userProfile">User Profile</Link>
                <br/>
                <Link to="/login">Login</Link>
                <br/>
                <Link to="/debits">Debits</Link>

                <AccountBalance accountBalance={this.props.accountBalance}/>
            </div> 
        )
    }
}

export default Home;