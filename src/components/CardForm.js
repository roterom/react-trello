import React, { Component } from 'react';
import service from '../services/TrelloService'
import queryString from 'query-string';
import { Switch, Redirect, Link } from 'react-router-dom';

const LABELS = ['Learning Unit', 'Lab', 'Example', 'Extra', 'Kata'];

const validators = {
  title: (value) => (value.length > 0) && (value.length < 100),
  label: (value) => value != ''
}

class CardForm extends Component {
  
  state = {
    card: {
      title:'',
      description: '',
      label: '',
      attachment: ''
    },
    errors: {
      title: true,
      label: true
    },
    touch: {},
    isClickedSubmit: false,
    isCardCreated: false
  }

  handleChange = (event) => {

    const {name, value, files} = event.target;

    const isValid = validators[name] === undefined || validators[name](value)
   // console.log("value ", event.target.value, "y files ", event.target.files[0])
    console.log("el cambio es a... ", value, "en ", name)
    this.setState({card:{
      ...this.state.card,
      [name]: (files && files[0]) ? files[0] : value}
      ,
      errors:{
        ...this.state.errors,
        [name]: !isValid
      }
    })
   
    console.log("el fichero ", event.target.files)

    console.log("en el Onchange..", this.state.card[name])
  }

  handleBlur = (event) => {
    this.setState({touch:{
      ...this.state.touch,
      [event.target.name]: true
    }})
    console.log("SALTO EL BLUR CON ", event.target.name)
  }

  handleSubmit= (event) => {
    this.setState({
      ...this.state,
      isClickedSubmit: true
    })
    console.log("el evento es", event.target)
    event.preventDefault();
    let card = {
      ...this.state.card,
      column: this.props.match.params.columnId,
      position: queryString.parse(this.props.location.search).position
     }
     console.log("la card es ", card)
    service.createCard(card)
      .then((response) => this.setState({
        ...this.state,
        isCardCreated: true
      }))
  }


  render = () => {


    const {card, errors, touch } = this.state;

    const anyError = Object.values(errors).some(error => error == true);

    const isLoading = () => {
      return this.isClickedSubmit ? <span class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span> : ''
    }

    const listOptionsSelect = () => {
      return LABELS.map((label, index) => {
        return <option key={index}>{label}</option>
      })
    }

    if (this.state.isCardCreated) {
      return <Redirect to="/" />
    } else {
      return(
        <form onSubmit={this.handleSubmit}>
          <div className="col-4 m-auto">
            <div className="card" style={{width: "30rem"}}>
              <div className="card-body">

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Card title</label>
                  <input type="text" className={`form-control ${(touch.title) ? (errors.title ? 'is-invalid' : 'is-valid') : ''}`} 
                  placeholder="title" 
                  name="title"
                  value={this.state.card.title} 
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}/>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                  <div className="invalid-feedback">
                    Please choose a title for the card.
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Label</label>
                  <select className={`form-control ${(touch.label) ? (errors.label ? 'is-invalid' : 'is-valid') : ''}`} 
                  name="label"  
                  value={card.label} 
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}>
                    <option value="" disabled>Select a category</option>
                    {listOptionsSelect()}
                  </select>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                  <div className="invalid-feedback">
                    Please choose a label.
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description</label>
                  <textarea className="form-control" 
                  id="exampleFormControlTextarea1" 
                  rows="3" 
                  placeholder="description" 
                  onChange={this.handleChange}>
                    {card.description}
                  </textarea>
                </div>

                <div className="form-group" style={{height:"175px"}} >
                  <label htmlFor="image">Choose attachment</label>
                  <div className="row">
                    <div className=" col-2 offset-2">
                      <label for="profilePic" className="btn btn-lg btn-warning file-label d-flex justify-content-center align-items-center"><span className=""><i className="fas fa-plus"></i></span></label>
                      <input type="file" 
                      id="image" 
                      className="form-control file-input" 
                      placeholder="image" 
                      name="attachment"
                      value={card.imageUrl} 
                      onChange={this.handleChange}/>
                    </div>
                    <div className="col-6 offset-2">
                      {this.state.card.attachment && <img className="img-upload rounded" src={URL.createObjectURL(this.state.card.attachment)} alt="..."/>}
                    </div>
                  </div>
              </div>

                <div className="form-group d-flex justify-content-center my-4">
                  <button type="submit" className="btn btn-primary mx-3" disabled={anyError}>
                    {isLoading()}
                    Submit
                  </button>
                  <Link to='/' className="btn btn-success mx-3">Atrás</Link>
                </div>
              </div>
            </div>
          </div>
        </form >
      )
    }
  }
}


export default CardForm;


