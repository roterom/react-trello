import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import service from '../services/TrelloService';

const Column  = (props) => {
  
  const cardList = props.cards.map(card => <Card key={card.position} {...card} fetchColumns={props.fetchColumns} />)

  const handleDelete = () => {
    service.deleteColumn(props.id)
      .then(()=> props.fetchColumns())
  }

  return(
    <div className="col-3">
      <div className="card">
      <span className="cardd text-primary" onClick={handleDelete}><i className="far fa-times-circle fa-lg"></i></span>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">{props.title}</h6>
          <div>
            {cardList}
            <Link to={`columns/${props.id}/new-card?position=${props.cards.length + 1}`}> New Card </Link>
          </div>
        </div>
      </div>
    </div>
  )
  }

export default Column;