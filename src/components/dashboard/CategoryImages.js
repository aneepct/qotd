import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import isEmpty from '../../validation/isEmpty';
import apiUrl from '../../config';

import Gallery from 'react-grid-gallery';
import Dropzone from 'react-dropzone';

import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';

import {
    getCategories,
    getCategoryImages,
    saveCategoryImages,
} from '../../actions/categoryActions';

const IMAGES = [];
// [{
//         id: '1',
//         src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
//         thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 174,
// },
// {
//         id: '2',
//         src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
//         thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 212,
//         caption: "Boats (Jeshu John - designerspics.com)"
// },

// {
//         id: '3',
//         src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
//         thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 212
// }]

class CategoryImages extends Component {
    state = {
        images: IMAGES,
        userCurrentDocument: {
            message: 'Drag & Drop files or Click here to upload',
        },
        files: [],
        dropzonClass: 'dropzon-input',
    };

    componentDidMount = () => {
        if(isEmpty(this.props.category.selectedCategory)) {
            this.props.history.push('/category');
        } else {
            this.props.getCategoryImages(this.props.category.selectedCategory._id);
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(!isEmpty(nextProps.category.categoryImages)){
            let categoryImages = nextProps.category.categoryImages.map((categoryImage, key) =>
                {
                    return {
                        id: categoryImage._id,
                        src: `${apiUrl}/api/category/get_image/${categoryImage.fileName}`,
                        thumbnail: `${apiUrl}/api/category/get_image/${categoryImage.fileName}`,
                        thumbnailWidth: 320,
                        thumbnailHeight: 212
                    }
                }
            );
            console.log(categoryImages);
            this.setState({images: categoryImages});
        }
    }

    selectedFile = (selectedFiles) => {
        if(isEmpty(selectedFiles)){
            let errorObj = {};
            let userCurrentObj = this.state.userCurrentDocument;
            userCurrentObj.message = 'Invalid file format please upload jpeg, png or pdf only.';
            errorObj = {
                dropzonClass: 'dropzon-input error',
                userCurrentDocument: userCurrentObj
            }
            this.setState(errorObj);
        } else {
            let droppedFile = [];
            let userCurrentObj = this.state.userCurrentDocument;

            selectedFiles.map(file => {
                droppedFile.push(file);
            });

            userCurrentObj.files = droppedFile;
            this.setState({
                userCurrentDocument: userCurrentObj,
                dropzonClass: 'dropzon-input'
            });

            this.setState({files: droppedFile});
        }
    }

    onSelectImage (index, image) {
        var images = this.state.images.slice();
        var img = images[index];
        if(img.hasOwnProperty("isSelected")) {
            img.isSelected = !img.isSelected;
        } else {
            img.isSelected = true;
        }

        this.setState({
            images: images
        });
    }

    addCategoryImages = async () => {
        console.log(this.state);
        let imagesParams = {
            files: this.state.files,
        }
        await this.props.saveCategoryImages(this.props.category.selectedCategory._id, imagesParams);
        this.props.getCategoryImages(this.props.category.selectedCategory._id);
    }

    render() {
        const {category} = this.props;

        console.log(category.categoryImages);

        return (
            <React.Fragment>
                <Navbar />
                <Sidebar {...this.props} />
                <div class="modal" tabindex="-1" role="dialog" id="addImages">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add Images</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <Dropzone
                                    onDrop={(selectedFile) => this.selectedFile(selectedFile)}
                                    accept="image/png, image/jpeg, application/pdf"
                                >
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps()}>
                                            {
                                                (isEmpty(this.state.userCurrentDocument.files) ?
                                                    <div className={this.state.dropzonClass}>
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <i class="fas fa-upload fa-3x"></i>
                                                            </div>
                                                            <div className='col-md-10'>
                                                                <div className="imgBox">
                                                                    Select Image
                                                                </div>
                                                                <input {...getInputProps()} />
                                                                {this.state.userCurrentDocument.message}
                                                            </div>
                                                        </div>
                                                    </div> :
                                                    <div className={this.state.dropzonClass}>
                                                        <div className="imgBox">
                                                        {this.state.userCurrentDocument.files.map((file, index) =>
                                                            <img
                                                                key={index}
                                                                src={URL.createObjectURL(file)}
                                                                alt={file.path}
                                                                width="150"
                                                            />
                                                        )}
                                                        </div>
                                                        <input {...getInputProps()} />
                                                        {/* { this.state.userCurrentDocument.file.path } */}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close" onClick={() => this.addCategoryImages()}>Save changes</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">Images</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/#/dashboard">Dashboard</a></li>
                                        <li className="breadcrumb-item active">Category Images</li>
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
                                        <h3 className="card-title p-3">
                                            {category.selectedCategory.name}
                                        </h3>
                                        <div className="ml-auto p-2 mr-2">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => this.props.history.push('/category')}
                                            >
                                                <i className="fas fa-arrow-left"></i> Back
                                            </button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button
                                                className="btn btn-primary btn-sm"
                                                data-toggle="modal" data-target="#addImages"
                                            >
                                                <i className="fas fa-plus"></i> Add Images
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <Gallery
                                            onClick={(!isEmpty(category.selectedCategory)) ? '' : undefined}
                                            onTouchEnd={(!isEmpty(category.selectedCategory)) ? '' : undefined}
                                            images={this.state.images}
                                            onSelectImage={this.onSelectImage}
                                        />
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

CategoryImages.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    getCategoryImages: PropTypes.func.isRequired,
    saveCategoryImages: PropTypes.func.isRequired,
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
        getCategoryImages,
        saveCategoryImages,
    }
)(withRouter(CategoryImages));