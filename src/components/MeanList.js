import React, {Component} from 'react';
import {Map, List} from 'immutable';

import styles from '../style/modal.module.scss';
import classNames from 'classnames/bind';

//icon
import {MdDelete, MdEdit} from 'react-icons/md';

const cx = classNames.bind(styles);

class MeanList extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.means.toString()
                === nextProps.means.toString() ) {
                    return false;
        }

        return true;
    }
    
    handleChange = (e) => {
        const { onChangeMean } = this.props;
        const id = e.target.parentElement.parentElement.id;
        onChangeMean(id);
    }

    handleRemove = (e) => {
        const { onRemoveMean } = this.props;
        const id = e.target.parentElement.parentElement.id;
        onRemoveMean(id);
    }
    
    render() {
        const { means } = this.props;
        const { handleChange, handleRemove} = this;
        let idx =0;
        const meanList = means.map( mean => (
            <div className={cx('mean')}
                id={idx}
                key={idx++}
            >
                <div className={cx('text')}>{mean}</div>
                <div className={cx('button')}>
                    <MdEdit
                        onClick={handleChange}
                    />
                    <MdDelete
                        onClick={handleRemove}
                    />
                </div>
            </div>
        ));


        return (
            <div className={cx('meansList')}>
                {meanList}
            </div>
        );
    }
}

export default MeanList;