import React from 'react';

const bal = {
    paddingLeft: '3%',
    paddingTop: '2%',
    textShadow: '2px 2px black'
}
const heading = {
    color: 'white',
    textShadow: '2px 2px 4px #000000',
    textDecoration: 'underline',
    fontSize: '150%',
    fontWeight: 'normal'
}

class AccountBalance extends React.Component{

    render() {
        return (
            <div style={bal}>
                <p style={heading}>Balance: ${this.props.accountBalance}</p>
            </div>
        );
    }
}

export default AccountBalance;