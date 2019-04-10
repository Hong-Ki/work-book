import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, List} from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as wordsActions from '../modules/words';
import * as testActions from '../modules/test';

import WordBoxList from '../components/WordBoxList';

import classNames from 'classnames/bind';

class WordBoxListContainer extends Component {

    handleSound = (id) => {
        const {WordsActions} = this.props;
        WordsActions.sound(id);
    }

    render() {
        const {words, keyword, mode} = this.props;
        const {handleSound} = this;

        return (
            <WordBoxList
                words={words}
                search={keyword}
                mode={mode}
                onSound={handleSound}
            />
        )
    }
}

export default connect(

    (state) => ({
        keyword: '',
        //keyword: state.get('keyword'),
        words : state.words,
        mode : ''
    }),
    (dispatch) => ({
        WordsActions: bindActionCreators(wordsActions, dispatch),
        TestActions: bindActionCreators(testActions, dispatch)
    })
) (WordBoxListContainer);