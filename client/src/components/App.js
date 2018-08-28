import React, { Component } from 'react';
import Header from './Header';
import EmailForm from './EmailForm';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <EmailForm />
      </div>
    );
  }
}

export default App;
