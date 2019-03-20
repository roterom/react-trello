import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true
})

const createColumn = (column) => {
  return http.post('/columns', column)
}

const getColumns = () => {
  return http.get('/columns')
}

const createCard = (card) => {
  const data = new FormData();
  Object.keys(card).forEach(key => data.append(key,card[key]));
  return http.post('/cards', data)
}

const deleteCard = (cardId) => {
  return http.delete(`/cards/${cardId}`, )
}

const deleteColumn = (columnId) => {
  return http.delete(`/columns/${columnId}`, )
}


export default {
  getColumns,
  createColumn,
  createCard, 
  deleteCard, 
  deleteColumn
};