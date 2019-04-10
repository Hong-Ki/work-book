import React, { Component } from 'react';
import WordBoxListContainer from './containers/WordBoxListContainer';
import TestForm from './components/TestForm'
import './App.scss';

class App extends Component {

  componentDidMount() {

    const words = localStorage.getItem('words');
    if ( words !== null && typeof (words) !== 'undefined' ) {
      
    } else {
      
    }

  }

  render() {
    return (
      <div>
        <WordBoxListContainer />
      </div>
    );
  }
}

export default App;
