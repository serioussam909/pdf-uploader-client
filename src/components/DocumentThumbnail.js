import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class DocumentThumbnail extends Component {

    constructor(props) {
        super(props);
        this.state = props.doc;
    }

    render() {

        return (
            <div className="col-sm-3">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <Link to={`/view/${this.state.id}`}>{this.state.name}</Link>
                    </div>
                    <div className="panel-body thumbnail-image-container">
                        <Link to={`/view/${this.state.id}`}>
                            <img
                                className="thumbnail-image"
                                src={`${axios.defaults.baseURL}documents/${this.state.id}/attachment/preview`}
                                alt={this.state.name}/>
                        </Link>
                    </div>
                </div>
            </div>
        );

    }
}

export default DocumentThumbnail;
