import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {List} from 'immutable';

import * as wordsActions from '../modules/words';
import * as testActions from '../modules/test';
import * as modalActions from '../modules/modal';
import * as baseActions from '../modules/base';

import Result from '../components/WordBoxList';
import WordBoxList from '../components/WordBoxList';
import Word from '../class/Word';

class WordBoxListContainer extends Component {
    

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.words.toString() !== this.props.words.toString() ) {
            localStorage.setItem('words', JSON.stringify(this.props.words));
        }

        if ( prevProps.mode !== 'TEST' && this.props.mode === 'TEST' ) {
            const {TestActions, words} = this.props;
            const testWords = List(words.toJS().map( word => new Word(word).toTest() ));

            TestActions.initialize( testWords );
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

    handleBlur = ( id, answer) => {
        const {TestActions, testWords} = this.props;
        const index = testWords.findIndex( word => word.get('id') === id );
        const answers = answer.split(',').map( answer => answer.replace(/ /g,'') );

        let isCorrect = false;

        if ( testWords.getIn([index,'answers']).isEmpty() && answer === '' ) {
            return;
        }

        if ( answers.length <= testWords.getIn([index,'means']).size ) {
            isCorrect = List(answers).filter(
                                answer => testWords.getIn([index,'means'])
                                    .findIndex( mean => mean === answer ) < 0
            ).size > 0 ? false : true;
        }

        TestActions.change({
            index: index,
            answers : List(answers),
            isCorrect : isCorrect
        })
    }

    render() {
        const {words, keyword, mode} = this.props;
        const {handleEdit, handleRemove, handleBlur} = this;

        return (
                <WordBoxList
                    words={words}
                    keyword={keyword}
                    mode={mode}
                    onEdit={handleEdit}
                    onRemove={handleRemove}
                    onBlur={handleBlur}
                />
        )
    }
}

export default connect(
    (state) => ({
        keyword: state.base.get('keyword'),
        words : state.words,
        mode : state.base.get('mode'),
        testWords : state.test.get('words')
    }),
    (dispatch) => ({
        WordsActions: bindActionCreators(wordsActions, dispatch),
        ModalActions: bindActionCreators(modalActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch),
        TestActions: bindActionCreators(testActions, dispatch)
    })
) (WordBoxListContainer);