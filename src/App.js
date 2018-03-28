import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import DocumentThumbnail from './components/DocumentThumbnail';
import ReactPaginate from 'react-paginate';

//change this to your api URL

axios.defaults.baseURL = "http://pdf-test.com/api/";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            curPage: (props.match.params.page
                ? parseInt(props.match.params.page, 10)
                : 1),
            pageCount: 1
        };
    }

    getDocuments(curPage) {
        axios
            .get('/documents?page=' + curPage)
            .then(res => {
                const rows = [];
                var rowId = 0;
                var row = [];
                const docs = res.data.data;
                for (var i = 1; i <= docs.length; i++) {
                    row.push(docs[i - 1]);
                    rows[rowId] = row;
                    if ((i) % 4 === 0) {
                      
                        row = [];
                        rowId++;
                    }
                }

                this.setState({rows: rows, pageCount: res.data.last_page});
            });
    }

    componentDidMount() {
        this.getDocuments(this.state.curPage);
    }

    handlePageClick = (data) => {
        const selected = (data.selected + 1);
        this
            .props
            .history
            .push('/' + selected);
        this.setState({curPage: selected});
        this.getDocuments(selected);
    }

    render() {

        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            DOCUMENTS
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4>
                            <Link to="/upload">
                                <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                                Upload New Document</Link>
                        </h4>
                        <ReactPaginate
                            initialPage={this.state.curPage - 1}
                            disableInitialCallback={true}
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={< a href = "" > ...</a>}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}/>
                        <div className="documents">
                            {this.state.rows.map((row, idx) => <Row row={row} key={idx}/>)}
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

function Row(props) {
    return (
        <div className="row">
            {props.row.map(doc => <DocumentThumbnail doc={doc} key={doc.id}/>)}
        </div>
    );
}

export default App;