import React, { Component } from 'react';
import WordBoxListContainer from './containers/WordBoxListContainer';
import WordModalContainer from './containers/WordModalContainer';
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
        <WordModalContainer/>
      </div>
    );
  }
}

export default App;
