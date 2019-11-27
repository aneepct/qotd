import React, { Component } from 'react';

export default class Sidebar extends Component {

    render() {
        console.log(this.props.history.location.pathname);
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="#/" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
                <span className="brand-text font-weight-light">QOTD</span>
                </a>

                <div className="sidebar">

                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                    <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                    <a href="#" className="d-block">Admin</a>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li className="nav-item">
                        <a href="/#/dashboard" className={
                            (this.props.history.location.pathname === '/dashboard') ?
                            "nav-link active" :
                            "nav-link"
                        }>
                            <i className="nav-icon fas fa-th"></i>
                            <p> Dashboard </p>
                        </a>
                    </li>
                    <li className={
                        (this.props.history.location.pathname === '/category' ||
                        this.props.history.location.pathname === '/add_category') ?
                        "nav-item has-treeview menu-open" :
                        "nav-item has-treeview"
                    }>
                        <a href="#" className={
                            (this.props.history.location.pathname === '/category' ||
                            this.props.history.location.pathname === '/add_category') ?
                            "nav-link active" :
                            "nav-link"
                        }>
                            <i className="nav-icon fas fa-copy"></i>
                            <p>
                                Categories
                                <i className="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                                <a href="/#/category" className={
                                    (this.props.history.location.pathname === '/category') ?
                                    "nav-link active" :
                                    "nav-link"
                                }>
                                    <i className="nav-icon fas fa-list"></i>
                                    <p>List</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/#/add_category" className={
                                    (this.props.history.location.pathname === '/add_category') ?
                                    "nav-link active" :
                                    "nav-link"
                                }>
                                    <i className="nav-icon fas fa-plus"></i>
                                    <p>Add Category</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* <li className={
                        (this.props.history.location.pathname === '/category_images' ||
                        this.props.history.location.pathname === '/category_images') ?
                        "nav-item has-treeview menu-open" :
                        "nav-item has-treeview"
                    }>
                        <a href="#" className={
                            (this.props.history.location.pathname === '/category_images' ||
                            this.props.history.location.pathname === '/category_images') ?
                            "nav-link active" :
                            "nav-link"
                        }>
                        <i className="nav-icon fas fa-tree"></i>
                        <p>
                            Images
                            <i className="fas fa-angle-left right"></i>
                        </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                                <a href="/#/category_images" className={
                                    (this.props.history.location.pathname === '/category_images') ?
                                    "nav-link active" :
                                    "nav-link"
                                }>
                                    <i className="nav-icon fas fa-list"></i>
                                    <p>List</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#/" className="nav-link">
                                    <i className="nav-icon fas fa-plus"></i>
                                    <p>Add Image</p>
                                </a>
                            </li>
                        </ul>
                    </li> */}
                    </ul>
                </nav>
                </div>
            </aside>
        )
    }
}
