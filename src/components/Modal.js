import React, {Component} from 'react';

import WordBox from './WordBox';

import classNames from 'classnames/bind';
import styles from '../style/index.module.scss';

const cx = classNames.bind(styles);

class Modal extends Component {

    handleBlur = ( e ) => {
        const {onBlur} = this.props;
        const mean = e.target.value;
        e.target.value='';
        e.target.focus();
        onBlur( mean );
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.keyCode === 9) {
            e.preventDefault();
            e.target.blur();
        }
    }

    handleChange = (e) => {
        const {onChange} =this.props;
        onChange(e.target.value);
    }

    render() {
        const { handleBlur, handleChange, handleKeyPress } = this;
        const {modal} = this.props;

        console.log( modal.toJS() )
        let idx =0;
        const meanList = modal.getIn(['word', 'means']).map( mean => (
            <div
                key={idx++}
            >
                {mean}
            </div>
        )) 

        return (
            <div className={cx('wrapper')}>
                <div className={cx('box')}>
                    <div>
                        <input
                            placeholder='단어'
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('meansList')}>
                        {meanList}
                    </div>
                    <input
                        placeholder='Mean'
                        onBlur={handleBlur}
                        onKeyDown={handleKeyPress}
                    />
                </div>
            </div>
        )
    }
}

export default Modal;