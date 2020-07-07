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

    addTransaction = (type, transaction) => {
        console.log(type);

        // Adding a debit transaction
        if (type === 0) {
            const transactions = this.state.debits;

            // Newer transactions should appear at the top of the page, so a new transaction should be added to the front of the array.
            transactions.unshift(transaction);
            this.setState({ debits: transactions });
        }
        // Adding a credit transaction
        else{
            const transactions = this.state.credits;
            transactions.unshift(transaction);
            this.setState({ credits: transactions });
        }       
    }

    increment = (type,amount) => {
        if (type === 0) {
            // Adding a debit will subtract from the balance.
            const debTotal = this.state.debitTotal - (-1*amount);
            this.setState({ debitTotal: debTotal });
        }
        else {
            // Adding a credit will add to the balance.
            const credTotal = this.state.creditTotal - (-1*amount);
            this.setState({ creditTotal: credTotal });
        }
    }

    mockLogIn = (logInInfo) => {

        /* Page would not load with this syntax. Decided instead to more explicitly set updatedUser to currentUser object.
        const newUser = { ...this.state.currentUser };*/

        const newUser ={
            userName: this.state.currentUser.userName,

            // User does not input memberSince data, so the memberSince of currentUser is used instead in order to keep UserProfile page more complete.
            memberSince: this.state.currentUser.memberSince
        };

        newUser.userName = logInInfo.userName;

        this.setState({ currentUser: newUser });
    } 

    render(){

        const HomeComponent = () => (<Home accountBalance={this.state.creditTotal - this.state.debitTotal} />);
        const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn}/>);
        const UserProfileComponent = () =>
            (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
        );
        const CreditComponent = () =>
            (<Credits increment={this.increment} addTransaction={this.addTransaction} credits={this.state.credits} accountBalance={(this.state.creditTotal - this.state.debitTotal)} />
        );
        const DebitComponent = () =>
            (<Debits increment={this.increment} addTransaction={this.addTransaction} debits={this.state.debits} accountBalance={(this.state.creditTotal - this.state.debitTotal)} />
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
