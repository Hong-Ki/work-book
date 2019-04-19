import React, {Component} from 'react';
import {InputWithButton} from './Input';

import styles from '../style/modal.module.scss';
import classNames from 'classnames/bind';

import Button from './Button';

//icon
import {MdDelete, MdEdit} from 'react-icons/md';

const cx = classNames.bind(styles);


class Mean extends Component {

    handleMode = () => {
        const {mean, toggleMode} = this.props;

        toggleMode(mean.get('id'));
    }

    handleRemove = () => {
        const {mean, onRemove} = this.props;
        onRemove(mean.get('id'));
    }

    handleChange = (e) => {
        const {value} = e.target;
        const {mean, onChange} = this.props;
        onChange(mean.get('id'), value);
    }

    render() {
        const {mean} = this.props;
        const {handleMode, handleRemove, handleChange} = this;
        const element = mean.get('isEditMode') ?
                        (
                            <InputWithButton
                                defaultValue={mean.get('mean')}
                                buttonClassName={'innerButton-right'}
                                onBlur={handleChange}
                            >
                                <MdEdit/>
                            </InputWithButton>
                        )
                        :
                        (   
                            <div  className={cx('mean')}>
                                <div className={cx('text')}>{mean.get('mean')}</div>
                                <div 
                                    className={cx('button')}
                                >
                                    <Button
                                        className={'button'}
                                        onClick={handleMode}
                                        >
                                        <MdEdit/>
                                    </Button>
                                    <Button
                                        className={'button'}
                                        onClick={handleRemove}
                                    >
                                        <MdDelete/>
                                    </Button>
                                </div>
                            </div>
                        );

        return (
            <div>
                {element}
            </div>
        )
    }
}

export default Mean;