import React, {Component} from 'react';
import axios from 'axios';
import ErrorPage from './ErrorPage';

class DocumentUploader extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            document: '',
            internalServerError: false
        };
    }

    onFileChange = (e) => {
        const state = this.state
        state.document = e.target.files[0];
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (this.state.document) {
            formData.append('document', this.state.document);
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios
            .post('/documents', formData, config)
            .then((res) => {
                if (res.status === 201) {
                    this.props.closeModal();
                    window.location.reload();
                } else {

                    const state = this.state;
                    state.error = res.data.message;
                    this.setState(state);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        if (this.state.internalServerError === true) {
            return (<ErrorPage/>);
        } else {
            return (
                <div className="panel-default modal-content">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            UPLOAD DOCUMENT
                        </h3>
                    </div>

                    <div className="panel-body">

                        <div className="panel panel-warning">
                            {this.state.error}
                        </div>

                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="document">Document:</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    required="required"
                                    name="document"
                                    accept=".pdf"
                                    onChange={this.onFileChange}
                                    placeholder="Document"/>
                            </div>
                            <button type="submit" className="btn btn-default">Upload</button>

                            <button onClick={this.props.history.goBack} className="btn btn-default cancel-button" type="button">Cancel</button>

                        </form>
                    </div>
                </div>

            );
        }
    }
}

export default DocumentUploader;