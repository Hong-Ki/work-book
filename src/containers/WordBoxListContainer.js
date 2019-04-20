import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, List} from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as wordsActions from '../modules/words';
import * as testActions from '../modules/test';
import * as modalActions from '../modules/modal';

import WordBoxList from '../components/WordBoxList';
import Word from '../class/Word';

import classNames from 'classnames/bind';

class WordBoxListContainer extends Component {
    

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.words.toString() !== this.props.words.toString() ) {
            localStorage.setItem('words', JSON.stringify(this.props.words));
        }
    }

    handleEdit = (id) => {
        const {ModalActions, words} = this.props;
        const index = words.findIndex( word => word.get('id') === id );
        const word = new Word(words.get(index).toJS()).toModal();

        ModalActions.show(word);
    }

    handleRemove = (id) => {
        const {WordsActions} = this.props;

        WordsActions.remove(id);
    }

    render() {
        const {words, keyword, mode} = this.props;
        const {handleEdit, handleRemove} = this;

        return (
            <WordBoxList
                words={words}
                search={keyword}
                mode={mode}
                onEdit={handleEdit}
                onRemove={handleRemove}
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
        ModalActions: bindActionCreators(modalActions, dispatch),
        TestActions: bindActionCreators(testActions, dispatch)
    })
) (WordBoxListContainer);