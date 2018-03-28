import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ModalContainer, ModalRoute} from 'react-router-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'react-router-modal/css/react-router-modal.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import DocumentUploader from './components/DocumentUploader';
import DocumentViewer from './components/DocumentViewer';
import NotFound from './components/NotFound';

ReactDOM.render(
  <Router>
  <div>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path='/:page' component={App}/>
      <Route path="*" component={NotFound}/>
    </Switch>
    <Switch>
      <ModalRoute
        component={DocumentViewer}
        path='/view/:id'
        className="document-viewer-modal react-router-modal__modal"/>
      <ModalRoute component={DocumentUploader} parentPath='/' path='/upload'/>
    </Switch>
    <ModalContainer/>
  </div>
</Router>, document.getElementById('root'));
registerServiceWorker();