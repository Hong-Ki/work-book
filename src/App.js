import React, { Component } from 'react';
import WordBoxListContainer from './containers/WordBoxListContainer';
import WordModalContainer from './containers/WordModalContainer';
import { connect } from 'react-redux'
import './App.scss';


import { bindActionCreators } from 'redux';

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

export default connect(
  (state) => ({
  }),
  (dispatch) => ({})
)(App);