import React, { Component } from 'react';
import { Router } from 'react-stax';
import './App.css';
import styled from 'styled-components';
import Home from './views/Home';
import Inspector from './views/Inspector';

const Container = styled.div`
  background-color: #eee;
`;

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Router defaultPage="/">
          <Home page="/" />
          <Inspector page="inspector" />
        </Router>
      </Container>
    );
  }
}

export default App;
