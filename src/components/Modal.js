import React, {Component} from 'react';

import classNames from 'classnames/bind';
import styles from '../style/modal.module.scss';

import Button from './Button';
import {InputWithButton} from './Input';
import MeanList from './MeanList';

import {MdAdd} from 'react-icons/md';

const cx = classNames.bind(styles);

class Modal extends Component {

    handleBlur = ( e ) => {
        const {onAddMean} = this.props;
        const mean = e.target.value;

        if (mean === '' || mean === null || typeof(mean) === 'undefined') {
            return;
        }
        
        e.target.value='';

        onAddMean( mean );
    }

    handleKeyDown = (e) => {
        if ( (e.keyCode === 13 || e.keyCode === 9) && e.target.value !== '' ) {
            e.preventDefault();
            e.target.blur();
            e.target.focus();
        }
    }

    handleChange = (e) => {
        const {onChange} =this.props;
        onChange(e.target.value);
    }

    render() {
        const { handleBlur, handleChange, handleKeyDown } = this;
        const {modal, toggleMeanMode, onChangeMean, onRemoveMean, onAdd, onCancel, mode} = this.props;

        let modeString = '등록';

        if (mode === 'change') {
            modeString = '수정';
        }
        const mdAdd = <MdAdd/>;
        return (
            <div className={cx('wrapper')}>
                <div className={cx('box')}>
                    <div className={cx('title')}> 
                        <p>단어 {modeString}</p>
                    </div>
                    <div className={cx('contents')}>
                        <div>
                            <input
                                placeholder='단어'
                                defaultValue={modal.getIn(['word','word'])}
                                onChange={handleChange}
                                required='required'
                            />
                            <MeanList
                                means = {modal.getIn(['word', 'means'])}
                                onChange = {onChangeMean}
                                onRemove = {onRemoveMean}
                                toggleMode = {toggleMeanMode}
                            />
                            <InputWithButton
                                className={'inputWrapper'}
                                buttonClassName={'innerButton-right'}
                                placeholder='Mean'
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                            >
                                <MdAdd/>
                            </InputWithButton>
                        </div>
                    </div>
                    <div 
                        className={cx('add')}
                        onClick={onAdd}
                    >
                        <span>{modeString}</span>
                    </div>
                    <div 
                        className={cx('cancel')}
                        onClick={onCancel}
                    >
                        <span>취소</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;