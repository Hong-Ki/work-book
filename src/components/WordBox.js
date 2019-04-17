import React, {Component} from 'react';
import {Map, List} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames/bind';

import styles from '../style/word.module.scss';

import Word from './Word';
import Means from './Means';
import Result from './Result';

const cx = classNames.bind(styles);

class WordBox extends Component {
    
    static propTypes = {
        word: ImmutablePropTypes.mapContains({
            means : ImmutablePropTypes.listOf(
                PropTypes.string
            ),
            word : PropTypes.string,
            id : PropTypes.string,
            wrongCounter : PropTypes.number,
            mode : PropTypes.string
        })
        // mode : PropTypes.string,
        // onCheck : PropTypes.func,
        // onGiveUp : PropTypes.func
    }

    handleEdit = (e) => {
        const {onEdit} = this.props;
        if ( e.target.tagName === 'DIV' || e.target.tagName === 'SPAN' ) {
            
            onEdit(e.target.closest('div').id);
        }
    }

    render() {
        const { word,mode, onEdit } = this.props;
        const {handleEdit} = this;

        return (
            <div className={cx('container')}
                id={word.get('id')}
                onClick={handleEdit}
            >
                <Word 
                    word={word.get('word')} 
                    id={word.get('id')}
                    />
                <Means
                    means={word.get('means')}
                    mode={mode}
                />
                <Result
                    id={word.get('id')}
                    word={word.get('word')}
                    isComplete={word.get('isComplete')}
                />
            </div>
        )
    }
}

export default WordBox;