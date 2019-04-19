import React, {Component} from 'react';
import {Map, List} from 'immutable';

import styles from '../style/modal.module.scss';
import classNames from 'classnames/bind';

import Mean from './Mean';


const cx = classNames.bind(styles);

class MeanList extends Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.means.toString()
                === nextProps.means.toString() ) {
                    return false;
        }

        return true;
    }
    
    handleBlur = (e) => {
        const {value} = e.target;
        const {onChangeMean, means } = this.props;
        const findIndex = means.findIndex(mean => mean.get('mean').trim() === value.trim());
        let mean = value;
        onChangeMean( findIndex, mean );
        
    }
    
    handleKeyPress = (e) => {
        if ( (e.keyCode === 13 || e.keyCode === 9 || e.key === 'Enter') && e.target.value !== '' ) {
            e.target.blur();
        }
    }
    
    handleRemove = (e) => {
        const { onRemoveMean } = this.props;
        const index = e.target.closest('div').getAttribute('index');
        
        onRemoveMean(index);
    }
    
    render() {
        const { means, onRemove, toggleMode, onChange } = this.props;
        const { handleRemove, handleBlur, handleKeyPress} = this;

        const meanList = means.map( 
            mean => (
                <Mean
                    key={mean.get('id')}
                    mean={mean}
                    toggleMode={toggleMode}
                    onChange={onChange}
                    onRemove={onRemove}
                />
            )
        );

        return (
            <div className={cx('meansList')}>
                {meanList}
            </div>
        );
    }
}

export default MeanList;