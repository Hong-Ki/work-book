import React, {Component} from 'react';

import classNames from 'classnames/bind';
import style from '../style/index.module.scss';

//icons
import {IoMdVolumeHigh} from 'react-icons/io';

const cx = classNames.bind(style);

class Result extends Component {

    render() {
        const {isComplete, onSound, id} = this.props;

        return (
            <span className={cx('result')}>
                <button className={cx('addButton')} onClick={onSound}>
                    <IoMdVolumeHigh />
                </button>
            </span>
        )
    }
}

export default Result;