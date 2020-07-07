import React from 'react'
import AccountBalance from './AccountBalance'
import { Link } from 'react-router-dom'

const link = {
    fontSize: '30%',
    paddingLeft: '61%',
    fontWeight: 'normal',
    fontFamily: 'Georgia',
}

const entry = {
    paddingTop: '3%',
    paddingLeft: '3%',
    paddingBottom: '3%',
    fontFamily: 'Georgia',
}

class Credits extends React.Component {
    constructor() {
        super();

        // State defines a transaction created by the user.
        this.state = {
            description: '',
            amount: 0,
            date: ''
        }
    }

    componentDidMount() {
        // Each transaction added gets the current date assigned to it as date.
        let d = new Date();

        // Although credits objects have the date recorded to the second, only the year, month, and date is desired by the user and it is more appealing when displayed.
        let fullDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        this.setState({ date: fullDate });
    }

    handleChange = (e) => {

        // If the input for description is being changed, update description.
        if (e.target.name === 'des') {
            this.setState({ description: e.target.value });
        }

        // If the input for amount is being changed, update amount.
        if (e.target.name === 'a') {
            this.setState({ amount: e.target.value });
        }

    }

    handleSubmit = event => {

        event.preventDefault();

        // On submit, incrememnt credit total by the amount of new transaction.
        this.props.increment(1,this.state.amount);

        /* Every <p> element displaying a transaction requires a unique identifier. Credit objects come with a unique id, so we need to create something similar 
           for new transactions. mockId uses part of description string and the whole amount. Creates an error with duplicate transactions, so randomness could
           be included in the future, but it is assumed that transactions will be unique. */
        let mockId = 'cdsrcComp-' + this.state.description.substring(0, 4) + this.state.amount;

        const creditTransaction = {
            id: mockId,
            description: this.state.description,
            amount: this.state.amount,
            date: this.state.date
        }

        // Append completed transaction object to credits array.
        this.props.addTransaction(1,creditTransaction);
    }

    render() {
        return (
            <div>         
                <h1 style={{ paddingLeft: "2%", fontSize: '300%' }}>   Credits
                    <span style={link}>
                        <Link style={{ paddingRight: '1%' }} to="/userProfile">User Profile</Link>
                        <Link style={{ paddingRight: '1%' }} to="/login">Login</Link>
                        <Link style={{ paddingRight: '1%' }} to="/">Home</Link>
                        <Link style={{ paddingRight: '1%' }} to="/debits">Debits</Link>
                    </span>
                </h1>

                <div style={{ backgroundColor: '#FFECC4', borderTop: '2px solid black', marginTop: '-.5%' }}>
                    <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                        {this.props.credits.map(cred => <p style={{ fontFamily: 'Georgia' }} key={cred.id}>
                            {cred.description} | ${cred.amount} | {cred.date.substring(0, 10)}</p>)
                        }
                    </div>

                    <AccountBalance accountBalance={this.props.accountBalance} />

                    <form onSubmit={this.handleSubmit} style={entry}>
                        <div>
                            <label htmlFor="description">Description: </label>
                            <input type="text" name="des" onChange={this.handleChange} style={{ marginBottom: '10px' }} />
                        </div>

                        <div>
                            <label htmlFor="amount">Amount: </label>
                            <input type="number" step="0.01" min="0" name="a" onChange={this.handleChange} style={{ marginBottom: '10px' }}/>
                        </div>

                        <span style={{ paddingLeft: '5%' }}>
                            <button >Add debit</button>
                        </span>
                    </form>
                </div>
            </div >
        );
    }
}

export default Credits;