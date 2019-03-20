import React from 'react';
import service from '../services/TrelloService'
import constants from '../constants';

const Card = (props) => {

  const handleDelete = () => {
    console.log("las props son ", props)
    service.deleteCard(props.id)
      .then(()=> props.fetchColumns())
  }
  //console.log("el color del label ", LABELS)
  console.log("las propiedades de la card =>", props.imageUrl)
  return (
    <div className="card mx-auto my-2">
      <span className="cardd btn btn-sm btn-outline-danger" onClick={handleDelete}><i className="fas fa-times"></i></span>
      <div className="card-body">
        <p><span className={`badge badge-${constants.LABELS[props.label]}`}>{props.label}</span></p>
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        {props.imageUrl && <img src={props.imageUrl} className="card-img-top" alt="..." style={{height:"150px"}}/>}
      </div>
    </div>
  )
}

export default Card;