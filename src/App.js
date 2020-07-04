import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';

class App extends Component{

    constructor() {
        super();
        this.state = {
            accountBalance: 14568.27,
            currentUser: {
                userName: 'bob_loblaw',
                memberSince: '08/23/99',
            }
        }
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

        const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
        const UserProfileComponent = () =>
            (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
        );
        const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props} />);

        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomeComponent} />
                    <Route exact path="/userProfile" component={UserProfileComponent} />
                    <Route exact path="/login" render={LogInComponent} />
                </Switch>
            </Router>
        );
    }
}

export default App;
