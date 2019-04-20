import React, { Component } from 'react';
import classNames from 'classnames/bind';

//components
import Header from './components/Header';

//containers
import WordBoxListContainer from './containers/WordBoxListContainer';
import WordModalContainer from './containers/WordModalContainer';
import FooterContainer from './containers/FooterContainer';

import * as wordsActions from './modules/words';

import * as layout from './style/layout.module.scss';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

const cx = classNames.bind(layout);

class App extends Component {
  

  componentDidMount() {

    const words = localStorage.getItem('words');
    if ( words !== null && typeof (words) !== 'undefined' ) {
      const {WordsActions} = this.props;
      WordsActions.loadWords(JSON.parse(words));
    }

  }

  render() {

    const {handleClick} = this;
    return (
      <div className={cx('wrapper')}>
        <Header/>
        
        <div className={cx('body')}>
          <WordBoxListContainer />
        </div>

        <FooterContainer/>
        <WordModalContainer/>

      </div>
    );
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    WordsActions : bindActionCreators(wordsActions, dispatch)
  })
)(App);