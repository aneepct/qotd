import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        console.log(this.props);
        return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#/dashboard" className="nav-link">Home</a>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a onClick={this.props.logOut} className="nav-link" data-widget="control-sidebar" data-slide="true">
                            <i className="fas fa-sign-out-alt"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}
