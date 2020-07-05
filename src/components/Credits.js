import React from 'react'
import AccountBalance from './AccountBalance'
import { Link } from 'react-router-dom'

const name = {
    paddingLeft: "2%",
    fontSize: '300%',
    borderBottom: '2px solid black',
}

const links = {
    float: 'right',
    paddingRight: '3%',
    fontSize: '30%',
    fontWeight: 'normal',
    fontFamily: 'Georgia'
}

const transactions = {
    marginTop: '-2.1%',
    textAlign: 'center',
    paddingTop: '10px'
}

const tran = {
    fontFamily: 'Georgia'
}

const log = {
    paddingTop: '3%',
    paddingLeft: '3%',
    paddingBottom: '3%',
    fontFamily: 'Georgia',
}

const space = {
    marginBottom: '10px'
}

const test = {
    paddingLeft: '5%',
}

class Credits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            debAB: this.props.accountBalance,
            transactions: [],
            description: '',
            amount: 0,
            date: ''
        }
    }

    componentDidMount() {
        let d = new Date();
        let fullDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        this.setState({ date: fullDate });
        console.log(this.props.accountBalance);
        console.log(this.state.debAB);
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
        let mockId = 'cdsrcComp-' + this.state.description.substring(0, 4) + this.state.amount;
        const creditTransaction = {
            id: mockId,
            description: this.state.description,
            amount: this.state.amount,
            date: this.state.date
        }

        let tempArr = [];
        this.state.transactions.map(tr => tempArr.push(tr));
        tempArr.unshift(creditTransaction);

        this.setState({ transactions: tempArr });

        // let nTotal = this.props.accountBalance - this.state.amount;
        //this.setState({ debAB: nTotal });
    }
    render() {
        return (
            <div>
                
                <h1 style={name}>Credits
                    <span style={links}>
                        <Link to="/">Home</Link>
                    </span>
                </h1>

                <div style={{ backgroundColor: '#FFECC4' }}>
                    <div style={transactions}>
                        {this.state.transactions.map(tr => <p style={tran} key={tr.id}>{tr.description} | {tr.amount} | {tr.date}</p>)}
                        {this.props.credits.map(cred => <p style={tran} key={cred.id}>{cred.description} | {cred.amount} | {cred.date.substring(0,10)}</p>)}
                    </div>

                    <AccountBalance accountBalance={this.props.accountBalance} />

                    <form onSubmit={this.handleSubmit} style={log}>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input type="text" name="des" onChange={this.handleChange} style={space} />
                        </div>

                        <div>
                            <label htmlFor="amount">Amount</label>
                            <input type="number" step="0.01" min="0" name="a" onChange={this.handleChange} style={space}/>
                        </div>

                        <span style={test}>
                            <button >Add debit</button>
                        </span>
                    </form>
                </div>

            </div >
        );
    }
}

export default Credits;