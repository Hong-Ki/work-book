import React from 'react';

import classNames from 'classnames/bind';

import * as styles from '../style/layout.module.scss'

import {InputWithButton} from './Input';

import {FaSearch} from 'react-icons/fa'

const cx = classNames.bind(styles);


const Header = () => (
    <div className={cx('header')}> 
        <span>
            Word Book 
        </span>
        <div>
            <InputWithButton
                buttonClassName={'innerButton-right'}
            >
                <FaSearch/>
            </InputWithButton>
        </div>
    </div>
);

export default Header;