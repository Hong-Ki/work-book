import React from 'react';

import classNames from 'classnames/bind';

import * as styles from '../style/layout.module.scss'

const cx = classNames.bind(styles);


const Header = () => (
    <div className={cx('header')}> Word Book </div>
);

export default Header;