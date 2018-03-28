import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NotFound extends Component {

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading"></div>
        <div className="panel-body">
          <h4>
            <Link to="/">
              <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
              Back To Document List</Link>
          </h4>
          <p>PAGE NOT FOUND</p>
        </div>
      </div>
    );
  }
}

export default NotFound;