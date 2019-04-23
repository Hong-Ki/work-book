import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Button from '../components/Button';

import * as baseActions from '../modules/base';

import {MdClose} from 'react-icons/md';

import classNames from 'classnames/bind';
import * as styles from '../style/layout.module.scss';

const cx = classNames.bind(styles);

class MenuContainer extends Component {

    handleSwitchMenu = () => {
        const {BaseActions} =this.props;
        BaseActions.switchMenu();
    }

    handleSelectMenu = (e) => {
        const {textContent} = e.target;
        const {BaseActions} = this.props;

        BaseActions.setMode(textContent);
        BaseActions.switchMenu();
    }
    
    render() {
        const {isActiveMenu} = this.props;
        const {handleSwitchMenu, handleSelectMenu} = this;
        
        const animetion = isActiveMenu ? 'open':'close';
        return (
            <div>
            {
                 (
                    <div>
                        <div className={cx('menuBase', 'wrapper-'+animetion)}
                            onClick={handleSwitchMenu}
                        >
                        </div>
                        <div className={cx('menuBar',animetion)}>
                            <div className={cx('buttons')}>
                                <Button
                                    className={['fullButton','rotate']}
                                    onClick={handleSwitchMenu}
                                >
                                    <MdClose/>
                                </Button>
                            </div>
                            <div 
                                className={cx('menu')}
                                onClick={handleSelectMenu}
                                >
                                WORDS
                            </div>
                            <div 
                                className={cx('menu')}
                                onClick={handleSelectMenu}
                            >
                                TEST
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
        )
    }
}

export default connect(
    (state) => ({
        isActiveMenu : state.base.get('isActiveMenu')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
) (MenuContainer);