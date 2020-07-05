import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debits from './components/Debits';
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
        const UserProfileComponent = () =>
            (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
        );
        const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props} />);
        const DebitComponent = () => (<Debits debits={this.state.debits} credits={this.state.credits} />);

        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomeComponent} />
                    <Route exact path="/userProfile" component={UserProfileComponent} />
                    <Route exact path="/login" render={LogInComponent} />
                    <Route exact path="/debits" render={DebitComponent}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
