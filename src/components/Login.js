import React, { Component } from 'react';
import authService from '../services/AuthService';
import { Redirect } from 'react-router-dom';

const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;

const validators = {
  email: (value) => {
    let error;
    if (!value) {
      error = 'Email is required'
    } else if (!emailPattern.test(value)) {
      error = 'Invalid email format';
    }
    return error;
  },
  password: (value) => {
    let error;
    if (!value) {
      error = 'Password is required'
    } else if (value.length < 8) {
      error = 'Password must contains at least 8 characters'
    }
    return error;
  }
}

class Login extends Component {

  state = {
    user: {
      email:"",
      password: ""
    },
    errors: {
      email: true
    },
    touch: {},
    logged: false
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validators[name] && validators[name](value)
      }
    })
  }

  handleBlur = (event) => {
    const {name} = event.target;
    this.setState({
      touch:{
        ...this.state.touch,
        [name]: true
      }
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("EN EL SUBMITTT")
    if (!this.hasErrors()) {
      console.log("no hay errores")
      authService.authenticate(this.state.user)
        .then(user => {
          console.log("user ", user)
          return this.setState({logged: true})
        },
        error => {
          const { message, errors } = error.response.data;
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors,
              password: message
            }
          })
        });
    }
  }

  hasErrors = () => Object.keys(this.state.user)
  .some(attr => validators[attr] && validators[attr](this.state.user[attr]))

  render() {
    const { touch, errors, user } = this.state;

    if (this.state.logged) {
      return <Redirect to="/" />
    } else {
      return (
        <div className="container">
          <div className="row">
            <form className="col-4 offset-8 m-auto py-5" onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input 
                type="email" 
                className={`form-control ${touch.email && errors.email && 'is-invalid'}`} 
                name="email" 
                value={user.email} 
                onChange={this.handleChange} 
                onBlur={this.handleBlur}
                id="exampleInputEmail1" 
                placeholder="Enter email" />
                <div className="invalid-feedback">{errors.email}</div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input 
                type="password" 
                className={`form-control ${touch.password && errors.password && 'is-invalid'}`} 
                name="password" 
                value={this.state.user.password} 
                onChange={this.handleChange} 
                onBlur={this.handleBlur}
                id="exampleInputPassword1" 
                placeholder="Password" />
                <div className="invalid-feedback">{errors.password}</div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={this.hasErrors()}>Login</button>
            </form>
          </div>
        </div>
      )
    }
  }
} 

export default Login;