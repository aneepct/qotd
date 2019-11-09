import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';

import { logOut } from '../../actions/authActions';

class Dashboard extends Component {
    onLogoutClick = ()  => {
        this.props.logOut();
    }

    render() {
        return (
            <div class="wrapper">
                <Navbar {...this.props} />
                <Sidebar {...this.props} />
            </div>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    logOut: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { logOut }
)(withRouter(Dashboard));
