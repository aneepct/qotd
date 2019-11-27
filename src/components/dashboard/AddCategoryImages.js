import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddCategoryImages extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

AddCategoryImages.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    category: state.category,
});

export default connect(
    mapStateToProps,
    { }
)(withRouter(AddCategoryImages));
