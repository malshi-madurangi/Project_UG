import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Players from './components/Players';
import UserModal from './components/PlayerModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './components/screens/Home';

import PropTypes from 'prop-types'

class App extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    store.dispatch(loadUser());
  };

  render() {
    
    return (
        <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <Players />
          </Container>
        </div>
        </Provider>
    );
  }
  
}

export default App;
