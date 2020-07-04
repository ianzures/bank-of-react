import React from 'react';

class AccountBalance extends React.Component{
    render() {
        return (
            <div>Balance: {this.props.accountBalance}</div>
        );
    }
}

export default AccountBalance;