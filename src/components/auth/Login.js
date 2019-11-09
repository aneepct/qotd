import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import isEmpty from '../../validation/isEmpty';

import { loginUser } from '../../actions/authActions';

class Login extends Component {

    state = {
        email: "",
        password: "",
        errors: {},
        name: "",
        twoFaDialog: false,
        verificationToken: '',
        loading: false,
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    }

    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
    };

    loginUser() {
        const userInput = {
          email: this.state.email,
          password: this.state.password
        }

        this.props.loginUser(userInput);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="/#/login"><strong>Admin</strong> QOTH</a>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in</p>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className={(errors.email) ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className={(errors.password) ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-lock"></span>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <button onClick={this.loginUser.bind(this)} className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(Login));
