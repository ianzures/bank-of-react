import React from 'react'
import AccountBalance from './AccountBalance'

class Debits extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>Debits</h1>

                <div>
                    {this.props.debits.map(deb => <p key={deb.id}>{deb.description}, {deb.amount}, {deb.date}</p>)}
                </div>

                <AccountBalance accountBalance={this.props.accountBalance} />

            </div>   
        );
    }
}

export default Debits;