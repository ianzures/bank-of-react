import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const log = {
    paddingTop: '2%',
    paddingLeft: '40%',
    paddingRight: '40%',
    fontFamily: 'Georgia',
}

const background = {
    marginTop: '1%',
    paddingBottom: '50%',
    backgroundSize: 'cover',
    backgroundPositin: 'center',
    backgroundImage: 'url("https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/09/12/21/bank-of-england-EPA.jpg")',
}

class LogIn extends Component{

    constructor() {
        super();
        this.state = {
            user: {
                userName: '',
                password: ''
            },
            redirect: false
        };
    }
    
    handleChange = (e) =>{

        /* Page would not load with this syntax. Decided instead to more explicitly set updatedUser to user object.
        const updatedUser = { ...this.state.user };*/
        const updatedUser = {
            userName: this.state.userName,
            password: this.state.password
        };

        const inputField = e.target.name;
        const inputValue = e.target.value;

        updatedUser[inputField] = inputValue;

        this.setState({ user: updatedUser });
    }
    
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.mockLogIn(this.state.user);

        this.setState({ redirect: true });
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to="/userProfile" />);
        }

        return (
            <div>
                <form style={log} onSubmit={this.handleSubmit}>

                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="userName">User Name: </label>
                        <input style={{ display: 'inlineBlock', float: 'right' }}
                            type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName}
                        />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="password">Password: </label>
                        <input style={{ display: 'inlineBlock', float: 'right' }}
                            type="password" name="password"
                        />
                    </div>

                    <span style={{ paddingLeft: '30%' }}>
                        <button >Log In</button>
                    </span>
                </form>

                <div style={background}> </div>
            </div>
        );
    }
}

export default LogIn;