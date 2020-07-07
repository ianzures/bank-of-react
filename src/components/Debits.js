import React from 'react'
import AccountBalance from './AccountBalance'
import { Link } from 'react-router-dom';

const links = {
    fontSize: '30%',
    paddingLeft: '61%',
    fontWeight: 'normal',
    fontFamily: 'Georgia',
}

const entry = {
    padding: '1% 0% 3% 3%',
    fontFamily: 'Georgia',
}


class Debits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            amount: 0,
            date:''
        }
    }

    componentDidMount() { 
        let d = new Date();
        let fullDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        this.setState({ date: fullDate });
    }

    handleChange = (e) => {

        if (e.target.name === 'des') {
            this.setState({ description: e.target.value });
        }

        if (e.target.name === 'a') {
            this.setState({ amount: e.target.value });
        }

    }

    handleSubmit = event => {

        event.preventDefault();

        this.props.increment(0,this.state.amount);

        let mockId = 'cdsrcComp-' + this.state.description.substring(0, 4) + this.state.amount;
        const debitTransaction = {
            id: mockId,
            description: this.state.description,
            amount: this.state.amount,
            date: this.state.date
        }

        this.props.addTransaction(0,debitTransaction);
    }

    render() {
        return(
            <div>         
                <h1 style={{ paddingLeft: "2%", fontSize: '300%' }}>   Debits
                    <span style={links}>
                        <Link style={{ paddingRight: '1%' }} to="/userProfile">User Profile</Link>
                        <Link style={{ paddingRight: '1%' }} to="/login">Login</Link>
                        <Link style={{ paddingRight: '1%' }} to="/">Home</Link>
                        <Link style={{ paddingRight: '1%' }} to="/credits">Credits</Link>
                    </span>
                </h1>

                <div style={{backgroundColor: '#FFECC4', borderTop: '2px solid black', marginTop: '-.5%',}}>
                    <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                        {this.props.debits.map(deb => <p style={{ fontFamily: 'Georgia' }} key={deb.id}>
                            {deb.description} | ${deb.amount} | {deb.date.substring(0, 10)}</p>)
                        }
                    </div>

                    <AccountBalance accountBalance={this.props.accountBalance} />

                    <form onSubmit={this.handleSubmit} style={entry}>
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="description">Description: </label>
                            <input type="text" name="des" onChange={this.handleChange} />
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="amount">Amount: </label>
                            <input type="number" step="0.01" min="0" name="a" onChange={this.handleChange} />
                        </div>

                        <span style={{ paddingLeft: '5%' }}>
                            <button>Add debit</button>
                        </span>
                    </form>
                </div>
            </div>   
        );
    }
}

export default Debits;