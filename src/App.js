import React, { Component } from 'react';
import classNames from 'classnames/bind';

//containers
import HeaderContainer from './containers/HeaderContainer';
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
    return (
      <div className={cx('wrapper')}>
        <HeaderContainer/>
        
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