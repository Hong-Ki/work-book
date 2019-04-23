import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames/bind';

import styles from '../style/word.module.scss';

import Word from './Word';
import Means from './Means';
import Etc from './Etc';

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

    handleBlur = (e) => {
        const {onBlur, word} = this.props;
        const {value} = e.target;

        onBlur(word.get('id'), value);
        
    }

    render() {
        const { word,mode, onRemove } = this.props;
        const {handleEdit, handleCheck, handleBlur} = this;
        return (
            <div className={cx('container')}
                key={word.get('id')}
                onClick={ (mode!=='TEST') ? handleEdit:null}
            >   
                { (mode!=='TEST') && (
                    <div
                        className={cx(['check','first'])}
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
                )}
                <Word 
                    word={word.get('word')} 
                    mode={mode}
                    />
                <Means
                    means={word.get('means')}
                    mode={mode}
                    onBlur={handleBlur}
                />
                <Etc
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