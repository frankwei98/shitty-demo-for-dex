import React, { Component } from 'react';
import UserPanel from "./containers/user";
import Store from './store'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidUpdate() {
    const { store, scatter } = this.props
    if (store.get('id') === null && scatter && scatter.identity) {
      store.set('id')(scatter.identity.accounts[0])
      store.set('scatter')(scatter)
    }
  }

  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to DEX Demo</h1>
        </header>
        <p className="App-intro">
          I am tired to edit muliple files
                </p>
        <UserPanel />
      </div>
    );
  }
}


export default Store.withStore(App);
