import React, { Component } from 'react';
import Column from './Column';
import service from '../services/TrelloService'
import ColumnForm from './ColumnForm';


class Board extends Component {

  state = {
    columns: [],
    error: ""
  }

  getColumns = () => {
    service.getColumns()
      .then(
        response => {
          this.setState({ columns: response.data})
        }, 
        err => this.setState({error: err})
      )
  }

  componentDidMount = () => {
    this.getColumns()
  }

  // onSubmitForm = (title) => {
  //   const pos = this.state.columns.length + 1;
  //   const col = {title: title, position: pos};
  //   service.
  //   this.setState({columns: [...this.state.columns, col]})
  // }
  columnList = () => this.state.columns.map(column => <Column key={column.position} {...column} fetchColumns={this.getColumns}/>);
  

  render = () => 
  <div className="container-fluid">
    <div className="row">
      {this.columnList()}
      <ColumnForm position={this.state.columns.length + 1} onAddColumn={this.getColumns}/>
    </div>
  </div>
};

export default Board;