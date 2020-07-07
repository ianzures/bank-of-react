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
            // Used to store data fetched using axios and transactions added by user.
            debits: [],
            credits: [],

            // Keep track of the sum of all credit transactions and all debit transactions. Used to calculate account balance equal to creditTotal - debitTotal.
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

            // Add all amount values from each credit object and store the sum in creditTotal.
            let tempTotal = 0;
            this.state.credits.forEach(c => tempTotal += c.amount);
            this.setState({ creditTotal: tempTotal });

        }).catch(err => console.log(err));

        // Fetch debits and store them in this.state.debits
        axios.get("https://moj-api.herokuapp.com/debits").then(result => {
            this.setState({ debits: result.data });

            // Add all amount values from each debit object and store the sum in debitTotal.
            let tempTotal = 0;
            this.state.debits.forEach(d => tempTotal += d.amount);
            this.setState({ debitTotal: tempTotal });

        }).catch(err => console.log(err));
    }

    /* Both functions take a parameter passed by the Credits component to modify states at the App level. Allows pages to remain consistent.*/
    credIncrement = (amount) => {

        // Increments creditTotal by the amount property of a transaction added by user. Account balance will remain correct across pages.
        const credTotal = this.state.creditTotal + amount;
        this.setState({ creditTotal: credTotal });
    }

    addCreditTransaction = (creditTransaction) => {
        const transactions = this.state.credits;

        // Newer transactions should appear at the top of the page, so a new transaction should be added to the front of the array.
        transactions.unshift(creditTransaction);
        this.setState({ credits: transactions });
    }

    /* Both functions take a parameter passed by the Debits component to modify states at the App level*/
    debIncrement = (amount) => {

        // Increments debitTotal by the amount property of a transaction added by user. 
        const debTotal = this.state.debitTotal + amount;
        this.setState({ debitTotal: debTotal });
    }

    addDebitTransaction = (debitTransaction) => {
        const transactions = this.state.debits;

    // Newer transactions should appear at the top of the page, so a new transaction should be added to the front of the array.
        transactions.unshift(debitTransaction);
        this.setState({ debits: transactions });
    }

    mockLogIn = (logInInfo) => {

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
        const UserProfileComponent = () =>
            (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
        );
        const CreditComponent = () =>
            (<Credits credIncrement={this.credIncrement} addCreditTransaction={this.addCreditTransaction} credits={this.state.credits} accountBalance={this.state.creditTotal - this.state.debitTotal} />
        );
        const DebitComponent = () =>
            (<Debits debIncrement={this.debIncrement} addDebitTransaction={this.addDebitTransaction} debits={this.state.debits} accountBalance={this.state.creditTotal - this.state.debitTotal} />
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
