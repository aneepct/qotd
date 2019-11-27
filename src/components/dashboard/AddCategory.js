import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';

import {addCategory} from '../../actions/categoryActions';

class AddCategory extends Component {
    state = {
        errors: {},
        name: '',
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addCategory = () => {
        let categoryData = {
            name: this.state.name
        }

        this.props.addCategory(categoryData, this.props.history);
    }

    render() {
        const {errors} = this.state;

        return (
            <React.Fragment>
                <Navbar />
                <Sidebar {...this.props} />
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">Add Category</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/#/dashboard">Dashboard</a></li>
                                        <li className="breadcrumb-item active">Add Category</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="content">
                        <div className="row">
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Add Category</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="categoryName">Category Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.handleInputChange}
                                                className={(errors.name) ? "form-control is-invalid" : "form-control"}
                                                id="categoryName"
                                                placeholder="Enter category name"
                                            />
                                            <div className="invalid-feedback">
                                                {(errors.name) ? errors.name : ""}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={this.addCategory}
                                        >Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}

AddCategory.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    addCategory: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    category: state.category,
});

export default connect(
    mapStateToProps,
    { addCategory }
)(withRouter(AddCategory));
