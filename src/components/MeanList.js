import React, {Component} from 'react';
import {Map, List} from 'immutable';

import styles from '../style/modal.module.scss';
import classNames from 'classnames/bind';

//icon
import {MdDelete, MdEdit} from 'react-icons/md';

const cx = classNames.bind(styles);

class MeanList extends Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.meanRef = React.createRef();
      }
    
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.means.toString()
                === nextProps.means.toString() ) {
                    return false;
        }

        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.meanRef.current !== null) {
            this.meanRef.current.focus();
        }
        
    }
    
    handleChange = (e) => {
            const index = e.target.getAttribute('index');
            const { onChangeMean } = this.props;
            
            onChangeMean( index );
    }
    
    handleBlur = (e) => {
        const {value} = e.target;
        const index = e.target.getAttribute('index');
        const {onChangeMean} = this.props;

        onChangeMean( index, value );
    }

    handleKeyPress = (e) => {
        if ( (e.keyCode === 13 || e.keyCode === 9 || e.key === 'Enter') && e.target.value !== '' ) {
            e.target.blur();
        }
    }

    handleRemove = (e) => {
        const { onRemoveMean } = this.props;
        const index = e.target.getAttribute('index');
        
        onRemoveMean(index);
    }
    
    render() {
        const { means } = this.props;
        const { handleChange, handleRemove, handleBlur, handleKeyPress} = this;
        let index = -1;
        debugger;
        const meanList = means.map( 
            mean => mean.get('isEditMode') ?
            (
                <div className={cx('mean')}
                    key={++index}
                >
                    <div className={cx('text')} >
                        <input 
                            index={index} 
                            ref={this.meanRef}
                            defaultValue={mean.get('mean')}
                            onBlur={handleBlur}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <MdEdit className={cx('submit')} />
                </div>
            ) 
            : 
            ( 
                <div className={cx('mean')}
                    key={++index}
                >
                    <div className={cx('text')}>{mean.get('mean')}</div>
                    <div className={cx('button')} >
                        <MdEdit 
                            index={index}
                            onClick={handleChange}
                        />
                        <MdDelete
                            index={index}
                            onClick={handleRemove}
                        />
                    </div>
                </div>
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