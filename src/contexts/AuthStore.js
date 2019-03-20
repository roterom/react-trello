/* import react, { Component } from 'react';
import AuthStore from './AuthStore';

const AuthContext = React.createContext();

class AuthStore extends Component {
  state = {
    user: {}
  }

  handleUserChange = (user) => {
    this.setState({ user: user })
  }

  render() {
    return (
      <AuthContext.Provider value={{
        user: this.state.user,
        onUserChanged: this.handleUserChanged
      }}>
      {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export { AuthContext, AuthStore } */