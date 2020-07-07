import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from 'axios';

class App extends Component{

    constructor() {
        super();
        this.state = {
            debits: [],
            credits: [],
            creditTotal: 0,
            debitTotal: 0,
            currentUser: {
                userName: 'bob_loblaw',
                memberSince: '08/23/99',
            }
        }
    }

    componentDidMount() {
        // Fetch credits and store them in this.state.credits
        axios.get("https://moj-api.herokuapp.com/credits").then(result => {
            this.setState({ credits: result.data });

            let cTotal = 0;
            this.state.credits.forEach(c => cTotal += c.amount);
            this.setState({ creditTotal: cTotal });

        }).catch(err => console.log(err));

        // Fetch debits and store them in this.state.debits
        axios.get("https://moj-api.herokuapp.com/debits").then(result => {
            this.setState({ debits: result.data });

            let dTotal = 0;
            this.state.debits.forEach(d => dTotal += d.amount);
            this.setState({ debitTotal: dTotal });

        }).catch(err => console.log(err));
    }

    credIncrement = (amount) => {
        const credTotal = this.state.creditTotal - amount;
        this.setState({ creditTotal: credTotal });
    }

    addCreditTransaction = (cTran) => {
        const cTransactions = this.state.credits;
        cTransactions.unshift(cTran);
        this.setState({ credits: cTransactions });
    }

    debIncrement = (amount) => {
        const debTotal = this.state.debitTotal - amount;
        this.setState({ debitTotal: debTotal });
    }

    addDebitTransaction = (dTran) => {
        const dTransactions = this.state.debits;
        dTransactions.unshift(dTran);
        this.setState({ debits: dTransactions });
    }

    mockLogIn = (logInInfo) =>{

        /* Page would not load with this syntax. Decided instead to more explicitly set updatedUser to currentUser object.
        const newUser = { ...this.state.currentUser };*/

        const newUser ={
            userName: this.state.currentUser.userName,
            memberSince: this.state.currentUser.memberSince
        };

        newUser.userName = logInInfo.userName;

        this.setState({ currentUser: newUser });
    } 

    render(){

        const HomeComponent = () => (<Home accountBalance={this.state.creditTotal - this.state.debitTotal} />);
        const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props} />);
        const CreditComponent = () => (<Credits credits={this.state.credits} credIncrement={this.credIncrement} addCreditTransaction={this.addCreditTransaction}
            accountBalance={this.state.creditTotal - this.state.debitTotal} />);

        const UserProfileComponent = () =>
            (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
        );
        const DebitComponent = () =>
            (<Debits debits={this.state.debits} credits={this.state.credits} accountBalance={this.state.creditTotal - this.state.debitTotal}
                debIncrement={this.debIncrement} addDebitTransaction={this.addDebitTransaction} />
            );

        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomeComponent} />
                    <Route exact path="/userProfile" component={UserProfileComponent} />
                    <Route exact path="/login" render={LogInComponent} />
                    <Route exact path="/debits" render={DebitComponent} />
                    <Route exact path="/credits" render={CreditComponent}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
