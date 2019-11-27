import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';

import {
    getCategories,
    removeCategory,
    selectedCategory,
} from '../../actions/categoryActions';

class Category extends Component {
    componentDidMount = () => {
        this.props.getCategories();
    }

    removeCategory = async (cateId) => {
        await this.props.removeCategory(cateId);
        await this.props.getCategories();
    }

    viewCategoryImages = async (category) => {
        await this.props.selectedCategory(category);
        this.props.history.push('/category_images');
    }

    render() {
        console.log(this.props);
        const {category} = this.props;

        return (
            <React.Fragment>
                <Navbar />
                <Sidebar {...this.props} />
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">Categories</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/#/dashboard">Dashboard</a></li>
                                        <li className="breadcrumb-item active">Category</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="content">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header d-flex p-0">
                                        <h3 className="card-title p-3">Categories</h3>
                                        <div className="ml-auto p-2 mr-2">
                                            <a href="/#/add_category">
                                                <button className="btn btn-primary btn-sm">
                                                    <i className="fas fa-plus"></i> Add
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-bordered table-hover dt-table" ref={dtTable => this.dtTable = dtTable}>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {category.categories.map(category => <tr key={category._id}>
                                                        <td>{category.name}</td>
                                                        <td>{category.date}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-link"
                                                                onClick={() => this.viewCategoryImages(category)}
                                                            >
                                                                <i className="fas fa-eye"></i>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-link"
                                                                onClick={() => this.removeCategory(category._id)}
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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

Category.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    removeCategory: PropTypes.func.isRequired,
    selectedCategory: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    category: state.category,
});

export default connect(
    mapStateToProps,
    {
        getCategories,
        removeCategory,
        selectedCategory,
    }
)(withRouter(Category));