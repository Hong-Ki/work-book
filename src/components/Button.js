import React from 'react';
import classNames from 'classnames/bind';

import * as styles from '../style/button.module.scss';

const cx = classNames.bind(styles);

const Button = ({children, ...rest}) => {

    return (
        <div 
            className={cx(rest.className)}
            onClick={rest.onClick}
        >
            {children}
        </div>
    )
}

export default Button;