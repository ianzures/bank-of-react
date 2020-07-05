import React from 'react'
import AccountBalance from './AccountBalance'

class Debits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            debAB : this.props.AccountBalance,
            transactions: [],
            description: '',
            amount: 0,
            date:''
        }
    }

    componentDidMount() {
        let d = new Date();
        let fullDate = d.getFullYear() + '-' + d.getDate() + '-' + (d.getMonth() + 1);
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
        let mockId = 'cdsrcComp-' + this.state.description.substring(0, 4) + this.state.amount;
        const debitTransaction = {
            id: mockId,
            description: this.state.description,
            amount: this.state.amount,
            date: this.state.date
        }

        let tempArr = [];
        this.state.transactions.map(tr => tempArr.push(tr));
        tempArr.unshift(debitTransaction);

        this.setState({ transactions: tempArr });

        let nTotal = this.props.accountBalance - this.state.amount;
        this.setState({ accountBalance: nTotal });
    }

    render() {
        return(
            <div>
                <h1>Debits</h1>

                <div>
                    {this.state.transactions.map(tr => <p key={tr.id}>{tr.description}, {tr.amount}, {tr.date}</p>)}
                    {this.props.debits.map(deb => <p key={deb.id}>{deb.description}, {deb.amount}, {deb.date}</p>)}
                </div>
                <AccountBalance accountBalance={this.state.debAB} />

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="des" onChange={this.handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="amount">Amount</label>
                        <input type="number" step="0.01" min="0" name="a" onChange={this.handleChange}/>
                    </div>

                    <button>Add debit</button>
                </form>

            </div>   
        );
    }
}

export default Debits;