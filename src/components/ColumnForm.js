import React, { Component } from 'react';
import service from '../services/TrelloService';


class ColumnForm extends Component {

  state={
    title:""
  }

  handleChange = (event) => {
    this.setState({title: event.target.value})
  }

  handleSubmit= (event) => {
    console.log("en el submit con ",this.state, this.props.position)
    event.preventDefault();
    service.createColumn({title: this.state.title, position: this.props.position})
      .then((response) => {
        this.props.onAddColumn();
        this.setState({title: ""});
      })
  }



  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="col-4">
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Column title</label>
              <input type="text" className="form-control" placeholder="title" 
              value={this.state.title} onChange={this.handleChange}/>
              {/* <small id="emailHelp" className="form-text text-muted">validations</small> */}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </form >
    )
  }
}

export default  ColumnForm;