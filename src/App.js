import React, { Component } from 'react';
import Header from './components/misc/Header';
import Board from './components/Board';
import Register from './components/Register';
import Login from './components/Login';
import { Switch, Route} from 'react-router-dom';
import CardForm from './components/CardForm'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/register" component={ Register }></Route>
          <Route exact path="/login" component={ Login }></Route>
          <Route exact path="/" component={ Board }/>
          <Route exact path="/columns/:columnId/new-card" component={ CardForm }/>
        </Switch>
      </div>
    );
  }
}

export default App;


