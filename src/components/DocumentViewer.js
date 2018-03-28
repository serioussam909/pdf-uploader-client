import React, {Component} from 'react';
import axios from 'axios';
import NotFound from './NotFound';

class DocumentViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notFoundError: false
        };
    }

    getDocument() {
        axios
            .get('/documents/' + this.props.match.params.id)
            .then(res => {
                this.setState(res.data);
            })
            .catch(e => {
                this.setState({'notFoundError': true});
            });
    }

    componentDidMount() {
        this.getDocument();
    }

    render() {
        if (this.state.notFoundError === true) {
            return (<NotFound/>);
        } else {
            return (
                <div className="panel-default modal-content">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {this.state.name}
                        </h3>
                    </div>
                    <div className="panel-body">
                        <iframe
                            className="document-viewer"
                            title="Document"
                            src={`${axios.defaults.baseURL}documents/${this.state.id}/attachment`}/>
                        <button
                            onClick={this.props.history.goBack}
                            className="btn btn-default cancel-button"
                            type="button">Close</button>
                    </div>
                </div>
            );
        }

    }
}

export default DocumentViewer;