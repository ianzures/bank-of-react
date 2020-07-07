import React from 'react';

const balanceBox = {
    paddingTop: '2%',
    paddingLeft: '3%',
    textShadow: '2px 2px black',
}
const balance = {
    color: 'white',
    fontSize: '150%',
    fontWeight: 'normal',
    textDecoration: 'underline',
    textShadow: '2px 2px 4px #000000'
}

class AccountBalance extends React.Component{

    render() {
        return (
            <div style={balanceBox}>

                {/* .toFixed(2) used to round balance to two decimal places */}
                <p style={balance}>Balance: ${this.props.accountBalance.toFixed(2)}</p>

            </div>
        );
    }
}

export default AccountBalance;