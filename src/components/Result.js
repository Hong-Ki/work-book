import React, {Component} from 'react';

import classNames from 'classnames/bind';
import style from '../style/word.module.scss';

//icons
import {IoMdVolumeHigh} from 'react-icons/io';

const cx = classNames.bind(style);

class Result extends Component {

    render() {
        const {isComplete, onSound, id} = this.props;

        return (
            <span className={cx('result')}>
                <p onClick={onSound}>
                    <IoMdVolumeHigh />
                </p>
            </span>
        )
    }
}

export default Result;