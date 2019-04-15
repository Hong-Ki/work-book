import React, {Component} from 'react';

import WordBox from './WordBox';

import classNames from 'classnames/bind';
import styles from '../style/modal.module.scss';

import MeanList from './MeanList';

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

    handleKeyPress = (e) => {
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
        const { handleBlur, handleChange, handleKeyPress } = this;
        const {modal, onChangeMean, onRemoveMean, onAdd, onCancel} = this.props;

        return (
            <div className={cx('wrapper')}>
                <div className={cx('box')}>
                    <div className={cx('title')}> 
                        <p>단어 등록</p>
                    </div>
                    <div className={cx('contents')}>
                        <div>
                            <input
                                placeholder='단어'
                                onChange={handleChange}
                            />
                        <MeanList
                            means = {modal.getIn(['word', 'means'])}
                            onChangeMean = {onChangeMean}
                            onRemoveMean = {onRemoveMean}
                        />
                        </div>
                        <div>
                            <input
                                placeholder='Mean'
                                onBlur={handleBlur}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                    <div 
                        className={cx('add')}
                        onClick={onAdd}
                    >
                        <span>ADD</span>
                    </div>
                    <div 
                        className={cx('cancel')}
                        onClick={onCancel}
                    >
                        <span>CANCEL</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;