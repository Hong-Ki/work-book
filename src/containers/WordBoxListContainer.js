import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as wordsActions from '../modules/words';
import * as testActions from '../modules/test';
import * as modalActions from '../modules/modal';
import * as baseActions from '../modules/base';

import WordBoxList from '../components/WordBoxList';
import Word from '../class/Word';

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
                keyword={keyword}
                mode={mode}
                onEdit={handleEdit}
                onRemove={handleRemove}
            />
        )
    }
}

export default connect(
    (state) => ({
        keyword: state.base.get('keyword'),
        words : state.words,
        mode : state.base.get('mode')
    }),
    (dispatch) => ({
        WordsActions: bindActionCreators(wordsActions, dispatch),
        ModalActions: bindActionCreators(modalActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch),
        TestActions: bindActionCreators(testActions, dispatch)
    })
) (WordBoxListContainer);