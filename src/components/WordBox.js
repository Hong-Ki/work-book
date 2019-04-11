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
            mean : ImmutablePropTypes.listOf(
                PropTypes.string
            ),
            word : PropTypes.string,
            id : PropTypes.number,
            wrongCounter : PropTypes.number,
            mode : PropTypes.string
        })
        // mode : PropTypes.string,
        // onCheck : PropTypes.func,
        // onGiveUp : PropTypes.func
    }

    handleSound = () => {
        const {onSound, word} = this.props;
        onSound(word.get('id'));
    }

    render() {
        const { word,mode } = this.props;
        const { handleChange, handleTest, handleSound } = this;

        return (
            <div className={cx('container')}>
                <Word 
                    word={word.get('word')} 
                    id={word.get('id')}
                />
                <Means
                    means={word.get('mean')}
                    mode={mode}
                />
                <Result
                    id={word.get('id')}
                    isComplete={word.get('isComplete')}
                    onSound={handleSound}
                />
            </div>
        )
    }
}

export default WordBox;