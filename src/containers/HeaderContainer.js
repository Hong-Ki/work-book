import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import classNames from 'classnames/bind';

import {InputWithButton} from '../components/Input';
import {FaSearch,FaBars} from 'react-icons/fa'

import * as baseActions from '../modules/base'
import * as styles from '../style/layout.module.scss'

import Button from '../components/Button';

const cx = classNames.bind(styles);

class HeaderContainer extends Component {
    
    handleChange = (e) => {
        const {BaseActions} =this.props;
        const {value} = e.target;
        
        BaseActions.search(value);
    }
    
    handleClick = (e) => {
        const {BaseActions} =this.props;
        BaseActions.switchMenu();
    }

    handleFocus = (e) => {
        const {mode} = this.props;

        if (mode === 'TEST') {
            window.alert("You can't use this!!");
            e.target.disabled=true;
            e.target.blur();
        }
    }

    render () {
        const {handleChange, handleClick, handleFocus} = this;
        const {mode} = this.props;

        return (
            <div className={cx('header')}> 
                <div>
                    <Button
                        onClick={handleClick}
                        className={'rotate'}
                    >
                        <FaBars/>
                    </Button>
                </div>
                <div>
                    Word Book 
                </div>
                <div>
                    <InputWithButton
                        buttonClassName={'innerButton-right'}
                        onChange={handleChange}
                        placeholder={'Search...'}
                        readOnly={mode === 'TEST'}
                        disabled={mode === 'TEST'}
                        onFocus={handleFocus}
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
        mode : state.base.get('mode'),
        isActiveMenu: state.base.get('isActiveMenu')
    }),
    (dispatch) => ({
        BaseActions : bindActionCreators(baseActions, dispatch)
    })
) (HeaderContainer);