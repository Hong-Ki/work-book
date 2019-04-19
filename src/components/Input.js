import React from 'react';
import classNames from 'classnames/bind';

import Button from './Button';

import * as button from '../style/button.module.scss';

const cx = classNames.bind(button);

const Input = ({children, ...rest}) => {
    return (
        <input
            placeholder={rest.placeholder}
            defaultValue={rest.defaultValue}
            onChange={rest.onChange}
            onBlur={rest.onBlur}
        />
    );
}
        
const InputWithButton = ({children, ...rest}) => {
    return (
        <div className={cx('inputWrapper')}>
            <input
                placeholder={rest.placeholder}
                defaultValue={rest.defaultValue}
                onKeyDown={rest.onKeyDown}
                onChange={rest.onChange}
                onBlur={rest.onBlur}
            />
            <Button
                className={cx(rest.buttonClassName)}
                placeholder={rest.placeholder}
                onClick={rest.onClick}
            >
                {children}
            </Button>
        </div>
    );
}

export {Input, InputWithButton};