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
        
const InputWithButton = React.forwardRef( (props,ref) => (
    <div className={cx('inputWrapper')}>
            <input
                ref={ref}
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                onKeyDown={props.onKeyDown}
                onChange={props.onChange}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                readOnly={props.readonly}
                disabled={props.disabled}
            />
            <Button
                className={cx(props.buttonClassName)}
                placeholder={props.placeholder}
                onClick={props.onClick}
            >
                {props.children}
            </Button>
        </div>
));


export {Input, InputWithButton};