import React, {Component} from 'react';

import WordBox from './WordBox';

import classNames from 'classnames/bind';
import styles from '../style/modal.module.scss';

//icons
import {IoMdVolumeHigh} from 'react-icons/io';

const cx = classNames.bind(styles);

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.modal.getIn(['word', 'means']).toJS().toString()
                === nextProps.modal.getIn(['word', 'means']).toJS().toString() ) {
                    return false;
        }

        return true;
    }

    handleBlur = ( e ) => {
        const {onAdd} = this.props;
        const mean = e.target.value;

        if (mean === '' || mean === null || typeof(mean) === 'undefined') {
            return;
        }
        
        e.target.value='';

        onAdd( mean );
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.keyCode === 9) {
            e.preventDefault();
            e.target.blur();
            e.target.focus();
        }
    }

    handleClick = (e) => {
        const {onRemove} = this.props;
        onRemove( e.target.id );
    }

    handleChange = (e) => {
        const {onChange} =this.props;
        onChange(e.target.value);
    }

    render() {
        const { handleBlur, handleChange, handleKeyPress, handleClick } = this;
        const {modal} = this.props;

        let idx =0;
        const meanList = modal.getIn(['word', 'means']).map( mean => (
            <div className={cx('mean')}
                id={idx}
                key={idx++}
                onClick={handleClick}
            >
                {mean}
                <div className={cx('button')}>
                    <IoMdVolumeHigh/>
                    <IoMdVolumeHigh/>
                </div>
            </div>
        )) 

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
                        </div>
                        <div className={cx('meansList')}>
                            {meanList}
                        </div>
                        <div>
                            <input
                                placeholder='Mean'
                                onBlur={handleBlur}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className={cx('add')}>
                        <span>ADD</span>
                    </div>
                    <div className={cx('cancel')}>
                        <span>CANCEL</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;