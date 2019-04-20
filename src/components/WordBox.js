import React, {Component} from 'react';
import {Map, List} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames/bind';

import styles from '../style/word.module.scss';

import Word from './Word';
import Means from './Means';
import Result from './Result';

import { FiSquare, FiCheckSquare} from 'react-icons/fi';

const cx = classNames.bind(styles);

class WordBox extends Component {
    
    static propTypes = {
        word: ImmutablePropTypes.mapContains({
            means : ImmutablePropTypes.listOf(
                PropTypes.string
            ),
            id : PropTypes.string,
            word : PropTypes.string,
            mode : PropTypes.string
        })
        // mode : PropTypes.string,
        // onCheck : PropTypes.func,
        // onGiveUp : PropTypes.func
    }

    handleCheck = (e) => {
        e.stopPropagation();

    }

    handleEdit = (e) => {
        const {onEdit, word} = this.props;
        onEdit(word.get('id'));
    }

    render() {
        const { word,mode, onRemove } = this.props;
        const {handleEdit, handleCheck} = this;
        return (
            <div className={cx('container')}
                key={word.get('id')}
                onClick={handleEdit}
            >   
                <div
                    className={cx('check')}
                    >
                    <input
                        id={word.get('id')}
                        onClick={handleCheck}
                        type={'checkbox'}
                        />
                    <label 
                        onClick={handleCheck}
                        htmlFor={word.get('id')}
                    >
                        <FiSquare/><FiCheckSquare/>
                    </label>
                </div>
                <Word 
                    word={word.get('word')} 
                    />
                <Means
                    means={word.get('means')}
                    mode={mode}
                />
                <Result
                    id={word.get('id')}
                    word={word.get('word')}
                    onRemove={onRemove}
                    isComplete={word.get('isComplete')}
                />
            </div>
        )
    }
}

export default WordBox;