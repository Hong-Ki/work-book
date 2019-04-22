import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import classNames from 'classnames/bind';

import {InputWithButton} from '../components/Input';
import {FaSearch} from 'react-icons/fa'

import * as baseActions from '../modules/base'
import * as styles from '../style/layout.module.scss'

const cx = classNames.bind(styles);

class HeaderContainer extends Component {
    
    handleChange = (e) => {
        const {BaseActions} =this.props;
        const {value} = e.target;
        
        BaseActions.search(value);
    }

    render () {
        const {handleChange} = this;

        return (
            <div className={cx('header')}> 
                <span>
                    Word Book 
                </span>
                <div>
                    <InputWithButton
                        buttonClassName={'innerButton-right'}
                        onChange={handleChange}
                        placeholder={'Search...'}
                    >
                        <FaSearch/>
                    </InputWithButton>
                </div>
            </div>  
        )
    }
};

export default connect(
    (state) => ({
        mode : state.base.get('mode')
    }),
    (dispatch) => ({
        BaseActions : bindActionCreators(baseActions, dispatch)
    })
) (HeaderContainer);